import React from "react";
import { useMemo } from "react";
import { FileText, Image as ImageIcon, File } from "lucide-react";
import "./filecard.css";

const FileCard = ({ name, type, size, updatedAt }) => {
  const icon = useMemo(() => {
    if (type.startsWith("image"))
      return <ImageIcon size={28} color="#5f6368" />;
    if (type.startsWith("document"))
      return <FileText size={28} color="#5f6368" />;
    return <File size={28} color="#5f6368" />;
  }, [type]);
  return (
    <div className="file_card">
      <div className="file_card_preview">{icon}</div>

      <div className="file_card_meta">
        <div className="file_card_name">{name}</div>
        <div className="file_card_info">
          <span>{size}</span>
          <span>{updatedAt}</span>
        </div>
      </div>
    </div>
  );
};

export default FileCard;
