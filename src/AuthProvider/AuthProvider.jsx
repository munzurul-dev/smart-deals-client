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
  const {loading , setLoading}= useState(false)
  const googleProvider = new GoogleAuthProvider();
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const login = (email , password)=>{
    return signInWithEmailAndPassword(auth,email,password);
  }

  const unsubscribe = () => {
    return signOut(auth);
  };

  const updateUserProfile = async (name, photoURL) => {
    if (!auth.currentUser) {
      throw new Error("User is not logged in");
    }

    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUsers(currentUser);
        return;
      }
      else{
        setUsers(null);
        console.log("User is signed out");
      }
    });
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
    login
  };
  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
