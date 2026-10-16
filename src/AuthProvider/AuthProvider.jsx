import { useState, createContext, useEffect } from "react";
import auth from "../Firebase/firebase.config";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  const createUser = async (email, password) => {
    setLoading(true);

    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);

    try {
      return await signInWithPopup(auth, googleProvider);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);

    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } finally {
      setLoading(false);
    }
  };

  const unsubscribe = async () => {
    setLoading(true);

    try {
      await signOut(auth);
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (name, photoURL) => {
    if (!auth.currentUser) {
      throw new Error("User is not logged in");
    }

    setLoading(true);

    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });

      setUsers(auth.currentUser);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUsers(currentUser);
        setLoading(false);
      },
      (error) => {
        console.error("Authentication error:", error);
        setUsers(null);
        setLoading(false);
      },
    );

    return () => unsubscribeAuth();
  }, []);

  const authData = {
    users,
    setUsers,
    createUser,
    signInWithGoogle,
    updateUserProfile,
    unsubscribe,
    loading,
    setLoading,
    login,
  };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
