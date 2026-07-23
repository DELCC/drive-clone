import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "./filepreviewmodal.css";

const isImage = (type = "") => type.startsWith("image");
const isPdf = (type = "") => type.includes("pdf");

const FilePreviewModal = ({
  file,
  inTrash = false,
  onClose,
  onMoveToTrash,
  onDelete,
}) => {
  const open = Boolean(file);

  // URL Firebase = cross-origin -> l'attribut `download` est ignoré par le
  // navigateur. On récupère donc le blob pour forcer un vrai téléchargement.
  const handleDownload = async () => {
    if (!file?.url) return;
    try {
      const res = await fetch(file.url);
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = file.name || "fichier";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error("Téléchargement impossible :", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="file-preview-title"
    >
      <Box className="preview_modal">
        <div className="preview_modal_header">
          <span id="file-preview-title" className="preview_modal_title">
            {file?.name}
          </span>
          <IconButton onClick={onClose} size="small" aria-label="Fermer">
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>

        <div className="preview_modal_body">
          {file && isImage(file.type) && (
            <img
              className="preview_modal_image"
              src={file.url}
              alt={file.name}
            />
          )}

          {file && isPdf(file.type) && (
            <iframe
              className="preview_modal_iframe"
              title={file.name}
              src={file.url}
            />
          )}

          {file && !isImage(file.type) && !isPdf(file.type) && (
            <div className="preview_modal_fallback">
              <p>Aperçu indisponible pour ce type de fichier.</p>
            </div>
          )}
        </div>

        {file && (
          <div className="preview_modal_footer">
            {inTrash ? (
              <Button
                variant="outlined"
                color="error"
                size="small"
                startIcon={<DeleteForeverIcon />}
                onClick={() => onDelete?.(file)}
              >
                Supprimer définitivement
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="error"
                size="small"
                startIcon={<DeleteIcon />}
                onClick={() => onMoveToTrash?.(file)}
              >
                Move to Trash
              </Button>
            )}
            <div className="preview_modal_footer_right">
              <Button
                variant="outlined"
                size="small"
                startIcon={<OpenInNewIcon />}
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ouvrir dans un nouvel onglet
              </Button>
              <Button
                variant="contained"
                size="small"
                startIcon={<DownloadIcon />}
                onClick={handleDownload}
              >
                Télécharger
              </Button>
            </div>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default FilePreviewModal;
