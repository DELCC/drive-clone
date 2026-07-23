import "./app.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home/Home";
import SignIn from "./components/auth/signin/SignIn";
import SignUp from "./components/auth/signup/SignUp";
import Profile from "./components/profile/Profile";
import Landing from "./components/landing/Landing";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { useDispatch } from "react-redux";
import { addUserToStore, deleteUserFromStore } from "./reducers/user";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          addUserToStore({
            id: user.uid,
            name: user.displayName,
            photo: user.photoURL,
          }),
        );
      } else {
        dispatch(deleteUserFromStore());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
