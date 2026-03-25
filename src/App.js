import "./app.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import SignIn from "./components/auth/signin/SignIn";
import SignUp from "./components/auth/signup/SignUp";
import Profile from "./components/profile/Profile";
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
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
