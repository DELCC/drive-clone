import React from "react";
import "./dashboard.css";
import FileCard from "../ui/FileCard";
import { useState, useEffect } from "react";
import { listAll } from "firebase/storage";
import { storage } from "../../firebase/config";
import { ref } from "firebase/storage";
import { getMetadata } from "firebase/storage";
import { useSelector } from "react-redux";

const Dashboard = ({ folder }) => {
  const [listStoredFiles, setListStoredFiles] = useState([]);
  const user = useSelector((state) => state.user.value);
  useEffect(() => {
    const fetchFiles = async () => {
      if (!folder || typeof folder !== "string" || !user?.id) return;
      try {
        const folderRef = ref(storage, `${user.id}/${folder}`);
        const result = await listAll(folderRef);

        const formatedFiles = await Promise.all(
          result.items.map(async (item) => {
            const metadata = await getMetadata(item);

            return {
              name: item.name,
              path: item.fullPath,
              size: metadata.size,
              updatedAt: new Date(metadata.updated).toLocaleString(),
              type: metadata.contentType,
            };
          }),
        );

        setListStoredFiles(formatedFiles); // on remplace complètement pour éviter les doublons
      } catch (error) {
        console.error("Erreur lors de la récupération des fichiers :", error);
      }
    };
    fetchFiles();
  }, [folder, user]);

  console.log(listStoredFiles);

  const files = listStoredFiles.map((file) => {
    return (
      <FileCard
        key={file.path}
        name={file.name}
        type={file.type}
        size={file.size}
        updatedAt={file.updatedAt}
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
    </div>
  );
};
export default Dashboard;
