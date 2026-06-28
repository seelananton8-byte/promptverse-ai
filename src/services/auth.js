import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { auth, provider } from "./firebase";

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    localStorage.setItem(
      "user",
      JSON.stringify(result.user)
    );

    return result.user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const observeAuth = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export const logout = async () => {
  localStorage.removeItem("user");
  await signOut(auth);
};