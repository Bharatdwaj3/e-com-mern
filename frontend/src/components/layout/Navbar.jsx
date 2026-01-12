import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import InputBase from "@mui/material/InputBase";
import CircularProgress from "@mui/material/CircularProgress";

import SearchIcon from "@mui/icons-material/Search";

import api from "../util/api";
;
const Navbar = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await api.get("/user/profile");
      setUser(res.data.user);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  fetchUser();
}, [location.pathname]);


  const handleMenu = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    try {
      await api.post("/user/logout");
      setUser(null);
      handleClose();
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const linkStyle = (path) =>
    location.pathname.startsWith(path)
      ? { color: "#00d8ff", fontWeight: 600 }
      : { color: "white" };

  if (loading) {
    return (
      <AppBar position="fixed" sx={{ backgroundColor: "#000" }}>
        <Toolbar sx={{ justifyContent: "center" }}>
          <CircularProgress size={24} sx={{ color: "#00d8ff" }} />
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#000", boxShadow: "none", zIndex: 1300 }}>
        <Toolbar sx={{ minHeight: 64, px: { xs: 2, md: 4 } }}>
          <Typography
            component={Link}
            to="/"
            variant="h5"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "1.6rem", md: "2rem" },
              color: "#00d8ff",
              textDecoration: "none",
              mr: 4,
              "&:hover": { opacity: 0.8 },
            }}
          >
            JoyCart
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 4, flexGrow: 1 }}>
            <Typography
              component={Link}
              to="/product"
              sx={{ ...linkStyle("/product"), textDecoration: "none", "&:hover": { color: "#00d8ff" } }}
            >
              Products
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", backgroundColor: "#1a1a1a", borderRadius: 2, px: 1.5, py: 0.5 }}>
              <SearchIcon sx={{ color: "gray", mr: 1 }} />
              <InputBase placeholder="Search" sx={{ color: "white", width: 120 }} />
            </Box>

     
            {user ? (
              <Tooltip title="Account">
                <IconButton onClick={handleMenu} sx={{ p: 0 }}>
                  <Avatar
                    src={user.avatar || "./download.jpg"}
                    sx={{ width: 36, height: 36, bgcolor: "#00d8ff" }}
                  >
                    {user.fullName?.[0]?.toUpperCase() || "U"}
                  </Avatar>
                </IconButton>
              </Tooltip>
            ) : (
              <>
                <Typography component={Link} to="/login" sx={{ color: "white", textDecoration: "none", "&:hover": { color: "#00d8ff" } }}>
                  Login
                </Typography>
                <Typography component={Link} to="/signup" sx={{ color: "#00d8ff", fontWeight: 700, textDecoration: "none", "&:hover": { opacity: 0.9 } }}>
                  Sign Up
                </Typography>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { mt: 1, backgroundColor: "#111", color: "white", minWidth: 180 } }}
      >
        {user ? (
          <>
            <MenuItem component={Link} to={`/${user.accountType}`} onClick={handleClose}>
              My Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </>
        ) : (
          <>
            
          </>
        )}
      </Menu>

      <Box sx={{ height: 64 }} />
    </>
  );
};

export default Navbar;