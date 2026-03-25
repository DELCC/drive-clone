import React from "react";
import Fab from "@mui/material/Fab";

import Button from "@mui/material/Button";
import { storage } from "../../firebase/config";
import { ref } from "firebase/storage";
import AddIcon from "@mui/icons-material/Add";
import ModalUpload from "../ui/ModalUpload";
import MenuItem from "../ui/MenuItem";
import { useState, useEffect } from "react";
import { Gauge } from "@mui/x-charts/Gauge";
import "./sidebar.css";
import { getMetadata, listAll } from "firebase/storage";
import { useSelector } from "react-redux";

const Sidebar = ({ selectedMenuItem, setSelectedMenuItem }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const user = useSelector((state) => state.user.value);

  const folderNames = ["Documents", "Images", "Videos"];
  useEffect(() => {
    if (!user) return;

    const getTotalStorageSize = async () => {
      try {
        let totalSize = 0;

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

          totalSize += sizes.reduce((acc, val) => acc + val, 0);
        }

        console.log("Total storage size (bytes):", totalSize);
      } catch (error) {
        console.error(error);
      }
    };

    getTotalStorageSize();
  }, [user]);
  return (
    <div className="left_sidebar">
      <div className="top_left_sidebar">
        <Button onClick={handleOpen} sx={{ px: 0.5, py: 0.5 }}>
          <Fab variant="extended">
            <AddIcon sx={{ mr: 1 }} />
            New
          </Fab>
        </Button>
        <ModalUpload open={open} handleClose={handleClose} />

        <div className="menu_items">
          <MenuItem
            selectedMenuItem={selectedMenuItem}
            setSelectedMenuItem={setSelectedMenuItem}
          />
        </div>
      </div>
      <div className="bottom_left_sidebar">
        <Gauge
          width={100}
          height={100}
          value={60}
          startAngle={-90}
          endAngle={90}
          sx={{
            "& text": {
              display: "none",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Sidebar;
