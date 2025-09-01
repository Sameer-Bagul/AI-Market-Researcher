import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// @ts-ignore - No types available for passport-linkedin-oauth2
import { Strategy as LinkedInStrategy } from "passport-linkedin-oauth2";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import connectPg from "connect-pg-simple";
import { registerSchema, loginSchema, type RegisterUser, type LoginUser } from "@shared/schema";
import type { User } from "@shared/schema";

declare global {
  namespace Express {
    interface User {
      id: string;
      username: string | null;
      email: string | null;
      firstName: string | null;
      lastName: string | null;
      country: string | null;
      contactNumber: string | null;
      industry: string | null;
      credits: number | null;
      provider: string | null;
      profileImageUrl: string | null;
    }
  }
}

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  if (!stored) return false;
  const [hashed, salt] = stored.split(".");
  if (!hashed || !salt) return false;
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

export function setupAuth(app: Express) {
  const PostgresSessionStore = connectPg(session);
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || "dev-secret-key",
    resave: false,
    saveUninitialized: false,
    store: new PostgresSessionStore({
      conString: process.env.DATABASE_URL,
  createTableIfMissing: false,
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    },
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  // Local email/password strategy
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' }, // Tell passport to use email field instead of username
      async (email, password, done) => {
        try {
          const user = await storage.getUserByEmail(email);
          if (!user || !user.password) {
            return done(null, false);
          }
          
          const isValid = await comparePasswords(password, user.password);
          if (!isValid) {
            return done(null, false);
          }
          
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // Google OAuth strategy
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: "/api/auth/google/callback",
        },
        async (accessToken: string, refreshToken: string, profile: any, done: any) => {
          try {
            let user = await storage.getUserByEmail(profile.emails?.[0]?.value || "");
            
            if (!user) {
              // Create new user from Google profile
              user = await storage.createUser({
                email: profile.emails?.[0]?.value || "",
                firstName: profile.name?.givenName,
                lastName: profile.name?.familyName,
                profileImageUrl: profile.photos?.[0]?.value,
                provider: "google",
                providerId: profile.id,
                credits: 50, // Give new users 50 credits
                // Set default values for required fields
                country: "United States",
                contactNumber: "",
                industry: "Other",
              });
            }
            
            return done(null, user);
          } catch (error) {
            return done(error);
          }
        }
      )
    );
  }

  // LinkedIn OAuth strategy
  if (process.env.LINKEDIN_CLIENT_ID && process.env.LINKEDIN_CLIENT_SECRET) {
    passport.use(
      new LinkedInStrategy(
        {
          clientID: process.env.LINKEDIN_CLIENT_ID,
          clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
          callbackURL: "/api/auth/linkedin/callback",
          scope: ["r_emailaddress", "r_liteprofile"],
        },
        async (accessToken: string, refreshToken: string, profile: any, done: any) => {
          try {
            let user = await storage.getUserByEmail(profile.emails?.[0]?.value || "");
            
            if (!user) {
              // Create new user from LinkedIn profile
              user = await storage.createUser({
                email: profile.emails?.[0]?.value || "",
                firstName: profile.name?.givenName,
                lastName: profile.name?.familyName,
                profileImageUrl: profile.photos?.[0]?.value,
                provider: "linkedin",
                providerId: profile.id,
                credits: 50, // Give new users 50 credits
                // Set default values for required fields
                country: "United States",
                contactNumber: "",
                industry: "Other",
              });
            }
            
            return done(null, user);
          } catch (error) {
            return done(error);
          }
        }
      )
    );
  }

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  // Registration endpoint
  app.post("/api/auth/register", async (req, res, next) => {
    try {
      const userData = registerSchema.parse(req.body);
      
      // Check if email already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      
      if (existingUser) {
        return res.status(400).json({ 
          message: "Email already exists" 
        });
      }

      // Create user with hashed password
      const user = await storage.createUser({
        ...userData,
        password: await hashPassword(userData.password),
        provider: "local",
        credits: 50, // Give new users 50 credits
      });

      req.login(user, (err) => {
        if (err) return next(err);
        res.status(201).json({ 
          id: user.id, 
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          country: user.country,
          contactNumber: user.contactNumber,
          industry: user.industry,
          credits: user.credits,
        });
      });
    } catch (error: any) {
      res.status(400).json({ 
        message: "Registration failed", 
        error: error.message 
      });
    }
  });

  // Login endpoint
  app.post("/api/auth/login", (req, res, next) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({ 
          message: "Invalid email or password" 
        });
      }
      
      req.login(user, (err) => {
        if (err) return next(err);
        res.json({
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          country: user.country,
          contactNumber: user.contactNumber,
          industry: user.industry,
          credits: user.credits,
        });
      });
    })(req, res, next);
  });

  // Google OAuth routes
  app.get("/api/auth/google", 
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get("/api/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/auth?error=google" }),
    (req, res) => {
      res.redirect("/app");
    }
  );

  // LinkedIn OAuth routes
  app.get("/api/auth/linkedin",
    passport.authenticate("linkedin", { state: "SOME STATE" })
  );

  app.get("/api/auth/linkedin/callback",
    passport.authenticate("linkedin", { failureRedirect: "/auth?error=linkedin" }),
    (req, res) => {
      res.redirect("/app");
    }
  );

  // Logout endpoint
  app.post("/api/auth/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.json({ message: "Logged out successfully" });
    });
  });

  // Get current user endpoint
  app.get("/api/auth/user", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    const user = req.user;
    res.json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      country: user.country,
      contactNumber: user.contactNumber,
      industry: user.industry,
      credits: user.credits,
      provider: user.provider,
    });
  });
}

export function isAuthenticated(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Authentication required" });
}