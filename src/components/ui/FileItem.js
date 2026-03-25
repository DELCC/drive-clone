import React from "react";
import { Progress } from "@mantine/core";
import "./fileitem.css";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CancelIcon from "@mui/icons-material/Cancel";

const FileItem = ({ file, uploadPercent, onFileDelete }) => {
  return (
    <div className="file_item">
      <div className="file_item_left">
        {/* <IconFile /> */}
        <InsertDriveFileIcon />

        <div className="file_item_info">
          <div className="file_item_header">
            <p className="file_name">{file.name}</p>
            <span className="file_size">({file.sizeReadable})</span>

            {uploadPercent > 0 && (
              <span className="file_percent">{uploadPercent}%</span>
            )}
          </div>

          {uploadPercent > 0 && (
            <Progress
              className="file_progress"
              size="sm"
              radius="xl"
              value={uploadPercent}
            />
          )}
        </div>
      </div>

      <button className="file_delete_btn" onClick={onFileDelete}>
        <CancelIcon />
      </button>
    </div>
  );
};

export default FileItem;
