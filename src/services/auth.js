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

/* ---------------- GOOGLE LOGIN ---------------- */
export const loginWithGoogle = async () => {
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
    localStorage.setItem("user", JSON.stringify(result.user));
    return result.user;
  }

  const result = await signInWithPopup(auth, provider);
  localStorage.setItem("user", JSON.stringify(result.user));
  return result.user;
};

/* ---------------- EMAIL SIGNUP ---------------- */
export const signup = async (name, email, password) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(result.user, { displayName: name });
  localStorage.setItem("user", JSON.stringify(result.user));
  return result.user;
};

/* ---------------- EMAIL LOGIN ---------------- */
export const login = async (email, password) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  localStorage.setItem("user", JSON.stringify(result.user));
  return result.user;
};

/* ---------------- RESET PASSWORD ---------------- */
export const forgotPassword = async (email) => {
  return await sendPasswordResetEmail(auth, email);
};

/* ---------------- OBSERVER ---------------- */
export const observeAuth = (callback) => {
  return onAuthStateChanged(auth, callback);
};

/* ---------------- LOGOUT ---------------- */
export const logout = async () => {
  localStorage.removeItem("user");
  if (Capacitor.isNativePlatform()) {
    const { FirebaseAuthentication } = await import(
      "@capacitor-firebase/authentication"
    );
    await FirebaseAuthentication.signOut();
  }
  await signOut(auth);
};