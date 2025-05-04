"use client";

import auth from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { login, logout } from "../../lib/store/user";

export default function AuthObserver() {
  const dispatch = useDispatch();

  useEffect(() => {
    const changeUserState = onAuthStateChanged(auth, (user) => {
      if (user) {
        const currentUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        };
        dispatch(login(currentUser));
      } else {
        dispatch(logout());
      }
    });
    return () => changeUserState();
  }, [dispatch]);

  return null;
}
