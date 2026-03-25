import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AssistantNavigationIcon from "@mui/icons-material/AssistantNavigation";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import "./header.css";
import logo from "../images/logo-google-drive-dashboard.svg";
import { useSelector } from "react-redux";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import { useNavigate } from "react-router-dom";
import { deleteUserFromStore } from "../../reducers/user";
import { useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import Link from "@mui/joy/Link";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onClickProfile = () => {
    navigate("/profile");
  };
  const onClickHome = () => {
    navigate("/dashboard");
  };
  const onClickLogOut = async () => {
    await signOut(auth);
    dispatch(deleteUserFromStore());
    navigate("/signin");
  };

  const settings = [
    { title: "Profile", action: onClickProfile },
    { title: "Logout", action: onClickLogOut },
  ];
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const user = useSelector((state) => state.user.value);
  console.log(user);
  return (
    <div className="header">
      <div className="header_left">
        <Link
          underline="none"
          color="neutral"
          onClick={onClickHome}
          aria-label="Home"
        >
          <img className="logo" src={logo} alt="Logo" />
          <p>Google Drive Clone</p>
        </Link>
      </div>
      <div className="header_center">
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <TextField id="input-with-sx" label="Search" variant="standard" />
          <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        </Box>
      </div>
      <div className="header_right">
        <div className="header_right_icons">
          <SettingsIcon />
          <HelpOutlineIcon />
          <AssistantNavigationIcon />
        </div>
        <div className="header_right_auth">
          <p>{user?.name || "Non Connecté "}</p>
          <Box sx={{ flexGrow: 0 }}>
            {/* <Tooltip
              title="Open settings"
              slotProps={{
                popper: {
                  sx: {
                    zIndex: 2000,
                  },
                },
              }}
            > */}
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              {user?.photo ? (
                <Avatar alt={user.name} src={user.photo} />
              ) : (
                <NoAccountsIcon />
              )}
            </IconButton>
            {/* </Tooltip> */}
            <Menu
              sx={{ mt: "45px", zIndex: 9999 }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, id) => (
                <MenuItem
                  key={id}
                  onClick={() => {
                    handleCloseUserMenu();
                    setting.action();
                  }}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {setting.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Header;
