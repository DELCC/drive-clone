import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CloudIcon from "@mui/icons-material/Cloud";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import LockIcon from "@mui/icons-material/Lock";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import logo from "../images/logo-google-drive-dashboard.svg";
import "./landing.css";

const features = [
  {
    icon: <CloudIcon fontSize="large" />,
    title: "Stockage cloud",
    text: "Déposez vos fichiers et retrouvez-les partout, à tout moment.",
  },
  {
    icon: <FolderSharedIcon fontSize="large" />,
    title: "Organisé par dossiers",
    text: "Documents, images et vidéos rangés automatiquement.",
  },
  {
    icon: <LockIcon fontSize="large" />,
    title: "Privé et sécurisé",
    text: "Vos fichiers vous sont réservés grâce à l'authentification.",
  },
];

const Landing = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);

  return (
    <div className="landing">
      <header className="landing_nav">
        <div className="landing_brand">
          <img src={logo} alt="Logo" />
          <span>Google Drive Clone</span>
        </div>
        <Stack direction="row" spacing={1}>
          {user ? (
            <Button variant="contained" onClick={() => navigate("/dashboard")}>
              Ouvrir mon Drive
            </Button>
          ) : (
            <>
              <Button variant="text" onClick={() => navigate("/signin")}>
                Se connecter
              </Button>
              <Button variant="contained" onClick={() => navigate("/signup")}>
                S'inscrire
              </Button>
            </>
          )}
        </Stack>
      </header>

      <main className="landing_hero">
        <h1>Vos fichiers, réunis en un seul endroit.</h1>
        <p>
          Un clone de Google Drive pour stocker, organiser et retrouver vos
          documents en toute simplicité.
        </p>
        <Stack direction="row" spacing={2} justifyContent="center">
          {user ? (
            <Button
              size="large"
              variant="contained"
              onClick={() => navigate("/dashboard")}
            >
              Ouvrir mon Drive
            </Button>
          ) : (
            <>
              <Button
                size="large"
                variant="contained"
                onClick={() => navigate("/signup")}
              >
                Commencer gratuitement
              </Button>
              <Button
                size="large"
                variant="outlined"
                onClick={() => navigate("/signin")}
              >
                Se connecter
              </Button>
            </>
          )}
        </Stack>

        <section className="landing_features">
          {features.map((f) => (
            <div className="landing_feature" key={f.title}>
              <div className="landing_feature_icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </section>
      </main>

      <footer className="landing_footer">
        <span>Développé par Clément DELCOURT</span>
        <div className="landing_footer_links">
          <a
            href="https://www.linkedin.com/in/cl%C3%A9ment-delcourt-75a981a3/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn de Clément Delcourt"
          >
            <LinkedInIcon fontSize="small" />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://github.com/DELCC"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub de Clément Delcourt"
          >
            <GitHubIcon fontSize="small" />
            <span>GitHub</span>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
