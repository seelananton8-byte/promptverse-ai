import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { App as CapacitorApp } from "@capacitor/app";

export default function BackHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let listener;

    (async () => {
      listener = await CapacitorApp.addListener(
        "backButton",
        () => {
          if (location.pathname === "/") {
            CapacitorApp.exitApp();
          } else {
            navigate("/");
          }
        }
      );
    })();

    return () => {
      listener?.remove();
    };
  }, [location.pathname, navigate]);

  return null;
}