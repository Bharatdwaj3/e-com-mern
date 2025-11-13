// Navbar.jsx – **RAKUTEN VIKI STYLE + BOOTSTRAP AUTH LOGIC** (ONLY Navbar, no forms)
import React, { useState } from "react";
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

// Icons
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

const Navbar = () => {
  const location = useLocation();

  // === USER AUTH (from Navigation.jsx) ===
  const token = localStorage.getItem("token");
  let user = null;
  if (token) {
    try {
      const raw = localStorage.getItem("user");
      user = raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.error("Corrupted user", e);
      localStorage.removeItem("user");
    }
  }

  // === CATEGORIES MENU ===
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // === LOGOUT ===
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
    window.location.href = "/login";
  };

  // === ACTIVE LINK ===
  const linkStyle = (path) =>
    location.pathname.startsWith(path) ? { color: "#00d8ff", fontWeight: 600 } : { color: "white" };

  return (
    <>
      {/* ==== RAKUTEN VIKI NAVBAR ==== */}
      <AppBar position="fixed" sx={{ backgroundColor: "#000", boxShadow: "none", zIndex: 1300 }}>
        <Toolbar sx={{ minHeight: 64, px: { xs: 2, md: 4 } }}>
          {/* LOGO */}
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
            HomeQuest
          </Typography>

          {/* NAV LINKS */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 4, flexGrow: 1 }}>
            <Box
              onClick={handleClick}
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                ...linkStyle("/category"),
                "&:hover": { color: "#00d8ff" },
              }}
            >
              Categories <KeyboardArrowDownOutlinedIcon sx={{ fontSize: 18, ml: 0.5 }} />
            </Box>
            <Typography component={Link} to="/product" sx={{ ...linkStyle("/product"), textDecoration: "none", "&:hover": { color: "#00d8ff" } }}>
              Products
            </Typography>
          </Box>

          {/* RIGHT SIDE */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* SEARCH */}
            <Box sx={{ display: "flex", alignItems: "center", backgroundColor: "#1a1a1a", borderRadius: 2, px: 1.5, py: 0.5 }}>
              <SearchIcon sx={{ color: "gray", mr: 1 }} />
              <InputBase placeholder="Search" sx={{ color: "white", width: 120 }} />
            </Box>

            {/* AUTH / AVATAR */}
            {token && user ? (
              <Tooltip title="Profile">
                <IconButton
                  onClick={handleClick}
                  sx={{ p: 0 }}
                >
                  <Avatar
                    src={user.avatarUrl || "./download.jpg"}
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

      {/* ==== DROPDOWN MENU (Categories + User) ==== */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { mt: 1, backgroundColor: "#111", color: "white", minWidth: 180 } }}
      >
        {/* Categories */}
        {token ? (
          <div>
            <MenuItem component={Link} to={user.accountType === "owner" ? "/customer-dashboard" : "/seller-dashboard"} onClick={handleClose}>
              My Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem onClick={handleClose} component={Link} to="/category/apartment">Apartment</MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/category/house">House</MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/category/villa">Villa</MenuItem>
          </div>
        )}
      </Menu>

      {/* SPACER */}
      <Box sx={{ height: 64 }} />
    </>
  );
};

export default Navbar;