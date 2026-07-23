import React from "react";
import { useMemo } from "react";
import { FileText, Image as ImageIcon, File } from "lucide-react";
import "./filecard.css";

// Taille en octets -> "12.34 Mo" (ou "0.02 Mo" pour les petits fichiers)
const formatSize = (bytes) => {
  if (bytes == null || isNaN(bytes)) return "—";
  return `${(bytes / (1024 * 1024)).toFixed(2)} Mo`;
};

// Date ISO -> "23 juil. 2026 à 14:30"
const formatDate = (value) => {
  if (!value) return "—";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const FileCard = ({ name, type, size, updatedAt, url, onClick }) => {
  const isImage = type.startsWith("image");
  const isPdf = type.includes("pdf");

  // Petite icône de type, affichée à côté du nom dans .file_card_meta
  const icon = useMemo(() => {
    if (isImage) return <ImageIcon size={16} color="#5f6368" />;
    if (isPdf) return <FileText size={16} color="#5f6368" />;
    return <File size={16} color="#5f6368" />;
  }, [isImage, isPdf]);

  // Aperçu façon "screenshot" dans .file_card_preview
  const preview = useMemo(() => {
    if (isImage && url)
      return <img className="file_card_thumb" src={url} alt={name} />;
    if (isPdf && url)
      return (
        <iframe
          className="file_card_thumb_pdf"
          src={`${url}#toolbar=0&navpanes=0&view=FitH`}
          title={name}
          tabIndex={-1}
        />
      );
    // Types non prévisualisables : grande icône neutre en fallback
    return (
      <div className="file_card_thumb_empty">
        <File size={28} color="#9aa0a6" />
      </div>
    );
  }, [isImage, isPdf, url, name]);

  return (
    <div className="file_card" onClick={onClick} role="button" tabIndex={0}>
      <div className="file_card_preview">{preview}</div>

      <div className="file_card_meta">
        <div className="file_card_name_row">
          {icon}
          <div className="file_card_name">{name}</div>
        </div>
        <div className="file_card_info">
          <span className="file_card_size">{formatSize(size)}</span>
          <span className="file_card_date">{formatDate(updatedAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default FileCard;
