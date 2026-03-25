import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import "./selectfolder.css";
import { useState } from "react";
import FolderRounded from "@mui/icons-material/FolderRounded";

const IitemsLIST = [
  {
    id: 1,
    label: "Documents",
    fileType: "folder",
  },
  {
    id: 2,
    label: "Images",
    fileType: "folder",
  },
  {
    id: 3,
    label: "Videos",
    fileType: "folder",
  },
];

export function SelectFolder({ selectedFolder, setSelectedFolder }) {
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setSelectedFolder(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className="selectfolder">
      <Button sx={{ display: "block", mt: 2, mb: 2 }} onClick={handleOpen}>
        Select Folder
      </Button>
      <FormControl
        sx={{
          m: 1,
          minWidth: 240,
          "&.Mui-selected": {
            backgroundColor: "#1976d2",
            color: "white",
            "&:hover": {
              backgroundColor: "#1565c0", // bleu un peu plus foncé au survol
            },
          },

          // Style au survol même si pas sélectionné
          "&:hover": {
            backgroundColor: "rgba(25, 118, 210, 0.08)",
          },
        }}
      >
        <InputLabel id="demo-controlled-open-select-label">Folder</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={selectedFolder}
          label="Folder"
          onChange={handleChange}
          sx={{
            textAlign: "center",
            "& .MuiSelect-select": {
              display: "flex",
              alignItems: "center",
              //   justifyContent: "center",
              gap: 2,
            },
          }}
        >
          {/* <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}

          {IitemsLIST.map((item) => {
            return (
              <MenuItem
                value={item.label}
                sx={{ display: "flex", alignItems: "center", gap: 2 }}
              >
                <FolderRounded />
                {item.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
