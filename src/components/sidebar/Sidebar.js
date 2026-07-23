import React from "react";
import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";
import { storage } from "../../firebase/config";
import { ref } from "firebase/storage";
import AddIcon from "@mui/icons-material/Add";
import UpgradeIcon from "@mui/icons-material/WorkspacePremium";
import ModalUpload from "../ui/ModalUpload";
import MenuItem from "../ui/MenuItem";
import { useState, useEffect } from "react";
import { Gauge } from "@mui/x-charts/Gauge";
import { useNavigate } from "react-router-dom";
import "./sidebar.css";
import { getMetadata, listAll } from "firebase/storage";
import { useSelector } from "react-redux";

// Quota du plan gratuit : 1 Go
const MAX_STORAGE_BYTES = 1 * 1024 * 1024 * 1024;

// Octets -> "342 Mo" / "1.20 Go" pour un affichage lisible
const formatBytes = (bytes) => {
  if (!bytes || bytes < 0) return "0 Mo";
  const mo = bytes / (1024 * 1024);
  if (mo < 1024) return `${Math.round(mo)} Mo`;
  return `${(mo / 1024).toFixed(2)} Go`;
};

const Sidebar = ({
  selectedMenuItem,
  setSelectedMenuItem,
  storageVersion,
}) => {
  const [open, setOpen] = useState(false);
  const [totalSize, setTotalSize] = useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();

  const folderNames = ["Documents", "Images", "Videos"];
  useEffect(() => {
    if (!user) return;

    const getTotalStorageSize = async () => {
      try {
        let total = 0;

        for (const folder of folderNames) {
          const folderRef = ref(storage, `${user.id}/${folder}/`);

          // Liste tous les fichiers dans le dossier
          const filesList = await listAll(folderRef);

          // Récupère les metadata de chaque fichier
          const sizes = await Promise.all(
            filesList.items.map(async (fileRef) => {
              const metadata = await getMetadata(fileRef);
              return metadata.size;
            }),
          );

          total += sizes.reduce((acc, val) => acc + val, 0);
        }

        setTotalSize(total);
      } catch (error) {
        console.error(error);
      }
    };

    getTotalStorageSize();
  }, [user, storageVersion]);

  // % d'occupation du quota, borné à 100
  const usagePercent = Math.min(
    100,
    Math.round((totalSize / MAX_STORAGE_BYTES) * 100),
  );
  return (
    <div className="left_sidebar">
      <div className="top_left_sidebar">
        <Fab variant="extended" color="primary" onClick={handleOpen}>
          <AddIcon sx={{ mr: 1 }} />
          New
        </Fab>
        <ModalUpload open={open} handleClose={handleClose} />

        <div className="menu_items">
          <MenuItem
            selectedMenuItem={selectedMenuItem}
            setSelectedMenuItem={setSelectedMenuItem}
          />
        </div>
      </div>
      <div className="bottom_left_sidebar">
        <span className="storage_label">Stockage</span>
        <Gauge
          width={110}
          height={90}
          value={usagePercent}
          startAngle={-90}
          endAngle={90}
          text={`${usagePercent}%`}
          sx={{
            "& .MuiGauge-valueText": {
              fontSize: 16,
              transform: "translateY(-8px)",
            },
          }}
        />
        <span className="storage_usage">
          {formatBytes(totalSize)} sur {formatBytes(MAX_STORAGE_BYTES)}
        </span>
        <Button
          variant="outlined"
          size="small"
          startIcon={<UpgradeIcon />}
          onClick={() => navigate("/profile", { state: { tab: 1 } })}
          sx={{ mt: 1, textTransform: "none", borderRadius: 2 }}
        >
          Upgrade Plan
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
