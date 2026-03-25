import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useDropzone } from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FileItem from "../ui/FileItem";
import { ref, uploadBytes } from "firebase/storage";
// import { v4 } from "uuid";
import { storage } from "../../firebase/config";
import Button from "@mui/material/Button";
import { useState } from "react";
import "../ui/modalupload.css";
import { SelectFolder } from "./SelectFolder";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalUpload = ({ open, handleClose }) => {
  const user = useSelector((state) => state.user.value);
  const [listDroppedFiles, setListDroppedFiles] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState("");

  const onDrop = (file) => {
    setListDroppedFiles((prevFiles) => [...prevFiles, file[0]]);
  };

  const onUpload = () => {
    listDroppedFiles.forEach((file) => {
      const docRef = ref(storage, `/${user.id}/${selectedFolder}/${file.name}`);
      uploadBytes(docRef, file).then(() => {
        handleClose();
        setListDroppedFiles([]);
      });
    });
  };

  const deleteFile = (index) => {
    setListDroppedFiles(listDroppedFiles.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [],
      "image/*": [],
    },
    maxFiles: 1,
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        <div
          {...getRootProps()}
          style={{
            border: "2px dashed #aaa",
            padding: "40px",
            textAlign: "center",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CloudUploadIcon className="icon" />
          <input {...getInputProps()} />
          {isDragActive
            ? "Dépose le fichier ici..."
            : "Glisse un fichier ou clique pour sélectionner"}
        </div>
        <div>
          {listDroppedFiles.length !== 0 &&
            listDroppedFiles.map((file, i) => {
              return (
                <FileItem
                  key={i}
                  file={file}
                  onFileDelete={() => deleteFile(i)}
                />
              );
            })}
          {listDroppedFiles.length !== 0 && (
            <SelectFolder
              selectedFolder={selectedFolder}
              setSelectedFolder={setSelectedFolder}
            />
          )}
          {listDroppedFiles.length !== 0 && (
            <div className="upload_button">
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                onClick={onUpload}
              >
                Upload files
              </Button>
            </div>
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default ModalUpload;
