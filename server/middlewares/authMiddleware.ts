import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// @ts-ignore - No types available for passport-linkedin-oauth2
import { Strategy as LinkedInStrategy } from "passport-linkedin-oauth2";
import { Express } from "express";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { AuthModel } from "../models/authModel";

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

export function setupAuth(app: Express) {
  const PostgresSessionStore = connectPg(session);
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || "dev-secret-key",
    resave: false,
    saveUninitialized: false,
    store: new PostgresSessionStore({
      conString: process.env.DATABASE_URL,
      createTableIfMissing: true,
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
          const user = await AuthModel.getUserByEmail(email);
          if (!user || !user.password) {
            return done(null, false);
          }
          
          const isValid = await AuthModel.comparePasswords(password, user.password);
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
            let user = await AuthModel.getUserByEmail(profile.emails?.[0]?.value || "");
            
            if (!user) {
              // Create new user from Google profile
              user = await AuthModel.createUser({
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
            let user = await AuthModel.getUserByEmail(profile.emails?.[0]?.value || "");
            
            if (!user) {
              // Create new user from LinkedIn profile
              user = await AuthModel.createUser({
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
      const user = await AuthModel.getUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}

export function isAuthenticated(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Authentication required" });
}