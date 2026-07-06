import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { updateProfile } from "firebase/auth";

import { auth, provider } from "./firebase";

/* ---------------- GOOGLE LOGIN ---------------- */

export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);

  localStorage.setItem(
    "user",
    JSON.stringify(result.user)
  );

  return result.user;
};

/* ---------------- EMAIL SIGNUP ---------------- */

export const signup = async (
  name,
  email,
  password
) => {
  const result =
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

  await updateProfile(result.user, {
    displayName: name,
  });

  localStorage.setItem(
    "user",
    JSON.stringify(result.user)
  );

  return result.user;
};

/* ---------------- EMAIL LOGIN ---------------- */

export const login = async (email, password) => {
  const result =
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

  localStorage.setItem(
    "user",
    JSON.stringify(result.user)
  );

  return result.user;
};

/* ---------------- RESET PASSWORD ---------------- */

export const forgotPassword = async (email) => {
  return await sendPasswordResetEmail(
    auth,
    email
  );
};

/* ---------------- OBSERVER ---------------- */

export const observeAuth = (callback) => {
  return onAuthStateChanged(auth, callback);
};

/* ---------------- LOGOUT ---------------- */

export const logout = async () => {
  localStorage.removeItem("user");
  await signOut(auth);
};