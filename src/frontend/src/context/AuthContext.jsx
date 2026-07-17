import React, { createContext, useContext, useState, useEffect } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";

const AuthContext = createContext(null);

// Firebase configuration (read from Vite environment variables)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Check if we have valid Firebase config credentials
const isFirebaseConfigured = !!(
  firebaseConfig.apiKey && 
  firebaseConfig.authDomain && 
  firebaseConfig.projectId
);

let auth = null;
if (isFirebaseConfigured) {
  try {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
    console.log(">>> Firebase Auth initialized successfully on client.");
    // Initialize analytics if supported
    try {
      getAnalytics(app);
      console.log(">>> Firebase Analytics initialized successfully.");
    } catch (e) {
      console.warn(">>> Firebase Analytics not initialized:", e.message);
    }
  } catch (err) {
    console.error(">>> Failed to initialize Firebase Auth client: ", err);
  }
} else {
  console.log(">>> Firebase config keys missing. Operating frontend in DEMO MODE.");
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(!isFirebaseConfigured);

  useEffect(() => {
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setCurrentUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || user.email.split("@")[0],
            isDemo: false
          });
        } else {
          setCurrentUser(null);
        }
        setLoading(false);
        setIsDemoMode(false);
      });
      return unsubscribe;
    } else {
      // Demo Mode: read persistent mock user from localStorage if it exists
      const savedUser = localStorage.getItem("wasteguide_demo_user");
      if (savedUser) {
        try {
          setCurrentUser(JSON.parse(savedUser));
        } catch (e) {
          setCurrentUser(null);
        }
      }
      setLoading(false);
      setIsDemoMode(true);
    }
  }, []);

  const login = async (email, password) => {
    if (auth) {
      return signInWithEmailAndPassword(auth, email, password);
    } else {
      // Mock login for demo
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (!email || !password) {
            reject(new Error("Email and password are required"));
            return;
          }
          const mockUser = {
            uid: "demo-uid-12345",
            email: email,
            displayName: email.split("@")[0] || "Demo User",
            isDemo: true
          };
          setCurrentUser(mockUser);
          localStorage.setItem("wasteguide_demo_user", JSON.stringify(mockUser));
          resolve(mockUser);
        }, 800);
      });
    }
  };

  const register = async (email, password) => {
    if (auth) {
      return createUserWithEmailAndPassword(auth, email, password);
    } else {
      // Mock register for demo
      return new Promise((resolve) => {
        setTimeout(() => {
          const mockUser = {
            uid: "demo-uid-12345",
            email: email,
            displayName: email.split("@")[0] || "Demo User",
            isDemo: true
          };
          setCurrentUser(mockUser);
          localStorage.setItem("wasteguide_demo_user", JSON.stringify(mockUser));
          resolve(mockUser);
        }, 800);
      });
    }
  };

  const logout = async () => {
    if (auth) {
      return signOut(auth);
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          setCurrentUser(null);
          localStorage.removeItem("wasteguide_demo_user");
          resolve();
        }, 500);
      });
    }
  };

  // Provide a method to trigger Demo Mode explicitly if needed
  const forceDemoMode = () => {
    const mockUser = {
      uid: "demo-uid-12345",
      email: "demo@wasteguide.ai",
      displayName: "Demo User",
      isDemo: true
    };
    setCurrentUser(mockUser);
    localStorage.setItem("wasteguide_demo_user", JSON.stringify(mockUser));
    setIsDemoMode(true);
  };

  const value = {
    currentUser,
    loading,
    isDemoMode,
    login,
    register,
    logout,
    forceDemoMode
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
