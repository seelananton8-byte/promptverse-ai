import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "./firebase";

export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);

  localStorage.setItem(
    "user",
    JSON.stringify(result.user)
  );

  return result.user;
};

export const logout = async () => {
  await signOut(auth);
};