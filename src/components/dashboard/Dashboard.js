import React from "react";
import "./dashboard.css";
import FileCard from "../ui/FileCard";
import FilePreviewModal from "../ui/FilePreviewModal";
import { useState, useEffect } from "react";
import { listAll } from "firebase/storage";
import { storage } from "../../firebase/config";
import { ref } from "firebase/storage";
import {
  getMetadata,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { useSelector } from "react-redux";

const Dashboard = ({ folder, onStorageChange }) => {
  const [listStoredFiles, setListStoredFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const user = useSelector((state) => state.user.value);
  const inTrash = folder === "Trash";
  useEffect(() => {
    const fetchFiles = async () => {
      if (!folder || typeof folder !== "string" || !user?.id) return;
      try {
        const folderRef = ref(storage, `${user.id}/${folder}`);
        const result = await listAll(folderRef);

        const formatedFiles = await Promise.all(
          result.items.map(async (item) => {
            const metadata = await getMetadata(item);
            const url = await getDownloadURL(item);

            return {
              name: item.name,
              path: item.fullPath,
              size: metadata.size,
              updatedAt: metadata.updated, // ISO brut, formaté dans FileCard
              type: metadata.contentType,
              url,
            };
          }),
        );

        setListStoredFiles(formatedFiles); // on remplace complètement pour éviter les doublons
      } catch (error) {
        console.error("Erreur lors de la récupération des fichiers :", error);
      }
    };
    fetchFiles();
  }, [folder, user, refreshKey]);

  // Déplace un fichier vers Trash : Storage n'a pas de "move" natif,
  // on recopie le blob dans Trash/ puis on supprime l'original.
  const handleMoveToTrash = async (file) => {
    if (!user?.id) return;
    try {
      const res = await fetch(file.url);
      const blob = await res.blob();
      const trashRef = ref(storage, `${user.id}/Trash/${file.name}`);
      await uploadBytes(trashRef, blob, { contentType: file.type });
      await deleteObject(ref(storage, file.path));
      setSelectedFile(null);
      setRefreshKey((k) => k + 1);
      onStorageChange?.(); // resynchronise la jauge de la Sidebar
    } catch (error) {
      console.error("Déplacement vers Trash impossible :", error);
    }
  };

  // Suppression définitive (utilisée depuis le dossier Trash).
  const handleDeletePermanently = async (file) => {
    try {
      await deleteObject(ref(storage, file.path));
      setSelectedFile(null);
      setRefreshKey((k) => k + 1);
      onStorageChange?.(); // resynchronise la jauge de la Sidebar
    } catch (error) {
      console.error("Suppression impossible :", error);
    }
  };

  const files = listStoredFiles.map((file) => {
    return (
      <FileCard
        key={file.path}
        name={file.name}
        type={file.type}
        size={file.size}
        updatedAt={file.updatedAt}
        url={file.url}
        onClick={() => setSelectedFile(file)}
      />
    );
  });

  return (
    <div className="dashboard">
      <div className="dashboard_header">
        <p>My Files</p>
      </div>
      <div className="dashboard_content">
        <div className="file_grid">{files}</div>
      </div>
      <FilePreviewModal
        file={selectedFile}
        inTrash={inTrash}
        onClose={() => setSelectedFile(null)}
        onMoveToTrash={handleMoveToTrash}
        onDelete={handleDeletePermanently}
      />
    </div>
  );
};
export default Dashboard;
