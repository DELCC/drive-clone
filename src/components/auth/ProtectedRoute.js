import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// Protège les routes privées : redirige vers "/" tant qu'aucun
// utilisateur n'est connecté, une fois l'état d'auth Firebase résolu.
const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user.value);
  const authReady = useSelector((state) => state.user.authReady);

  // On attend la 1ère réponse de Firebase avant de décider,
  // sinon on éjecterait l'utilisateur à chaque rechargement de page.
  if (!authReady) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
