import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { auth, provider } from "./firebase";
import { Capacitor } from "@capacitor/core";

/* ---------------- HELPER: STORE ONLY SAFE FIELDS ---------------- */
const persistUser = (user) => {
  const { uid, email, displayName, photoURL } = user;
  localStorage.setItem(
    "user",
    JSON.stringify({ uid, email, displayName, photoURL })
  );
};

/* ---------------- GOOGLE LOGIN ---------------- */
export const loginWithGoogle = async () => {
  try {
    if (Capacitor.isNativePlatform()) {
      const { FirebaseAuthentication } = await import(
        "@capacitor-firebase/authentication"
      );
      const { credential } = await FirebaseAuthentication.signInWithGoogle();
      const { GoogleAuthProvider, signInWithCredential } = await import(
        "firebase/auth"
      );
      const authCredential = GoogleAuthProvider.credential(credential.idToken);
      const result = await signInWithCredential(auth, authCredential);
      persistUser(result.user);
      return result.user;
    }

    const result = await signInWithPopup(auth, provider);
    persistUser(result.user);
    return result.user;
  } catch (error) {
    console.error("loginWithGoogle failed:", error.code || error.message);
    throw error;
  }
};

/* ---------------- EMAIL SIGNUP ---------------- */
export const signup = async (name, email, password) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: name });
    persistUser(result.user);
    return result.user;
  } catch (error) {
    console.error("signup failed:", error.code || error.message);
    throw error;
  }
};

/* ---------------- EMAIL LOGIN ---------------- */
export const login = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    persistUser(result.user);
    return result.user;
  } catch (error) {
    console.error("login failed:", error.code || error.message);
    throw error;
  }
};

/* ---------------- RESET PASSWORD ---------------- */
export const forgotPassword = async (email) => {
  try {
    return await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error("forgotPassword failed:", error.code || error.message);
    throw error;
  }
};

/* ---------------- OBSERVER ---------------- */
export const observeAuth = (callback) => {
  return onAuthStateChanged(auth, callback);
};

/* ---------------- LOGOUT ---------------- */
export const logout = async () => {
  try {
    if (Capacitor.isNativePlatform()) {
      const { FirebaseAuthentication } = await import(
        "@capacitor-firebase/authentication"
      );
      await FirebaseAuthentication.signOut();
    }
    await signOut(auth);
    localStorage.removeItem("user");
  } catch (error) {
    console.error("logout failed:", error.code || error.message);
    throw error;
  }
};