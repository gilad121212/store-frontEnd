import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Outlet } from "react-router-dom";
import SignUp from "./signUp/signUpDialog";
import SignIn from "./logIn/signInDialog";
import ShoppingCart from "./shoppingCart";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const pages = ["Home page"];

function ResponsiveAppBar() {
  const authContext = React.useContext(AuthContext);
  const isAuthenticated = authContext?.isAuthenticated;
  const setAuthenticated = authContext?.setIsAuthenticated;
  console.log("auth:", authContext);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const [openSignUp, setOpenSignUp] = React.useState(false);
  const [openMenu] = React.useState(true);
  const [selectedValueSignUp, setSelectedValueSignUp] = React.useState("");
  const [openSignIn, setOpenSignIn] = React.useState(false);
  const [selectedValueSignIn, setSelectedValueSignIn] = React.useState("");

  const handleClickOpenSignUpDialog = () => {
    setOpenSignUp(true);
  };
  const handleCloseSignUp = (value: string) => {
    setOpenSignUp(false);
    setSelectedValueSignUp(value);
  };
  const handleClickOpenSignInDialog = () => {
    setOpenSignIn(true);
  };
  const handleCloseSignIn = (value: string) => {
    setOpenSignIn(false);
    setSelectedValueSignIn(value);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = () => {
    setAuthenticated &&
      setAuthenticated(() => {
        return null;
      });
    localStorage.removeItem("user");
  };
  const navigate = useNavigate();

  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              STORE
            </Typography>
            {isAuthenticated && <div>{isAuthenticated.email}</div>}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem>
                    <Typography textAlign="left">{page}</Typography>
                  </MenuItem>
                ))}
                <MenuItem key={"page"} onClick={handleCloseNavMenu}>
                  <ShoppingCart></ShoppingCart>
                </MenuItem>
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => navigate(`/`)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}

              <Button
                key={"page"}
                onClick={handleCloseNavMenu}
                sx={{
                  color: "white",
                  display: "block",
                  padding: "0 4px",
                }}
              >
                <ShoppingCart />
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              {openMenu && (
                <Menu
                  sx={{ mt: "45px" }}
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
                  {!isAuthenticated && (
                    <>
                      <MenuItem
                        key={"sign up"}
                        onClick={handleClickOpenSignUpDialog}
                      >
                        <Typography textAlign="center">{"Sign up"}</Typography>
                      </MenuItem>
                      <SignUp
                        selectedValue={selectedValueSignUp}
                        open={openSignUp}
                        onClose={handleCloseSignUp}
                        handleClickOpenSignIn={handleClickOpenSignInDialog}
                      />
                      <MenuItem
                        key={"sign in"}
                        onClick={handleClickOpenSignInDialog}
                      >
                        <Typography textAlign="center">{"Sign in"}</Typography>
                      </MenuItem>
                      <SignIn
                        selectedValue={selectedValueSignIn}
                        open={openSignIn}
                        onClose={handleCloseSignIn}
                        handleClickOpenSignUp={handleClickOpenSignUpDialog}
                      />
                    </>
                  )}

                  {isAuthenticated && (
                    <MenuItem onClick={handleLogOut} key={"Log out"}>
                      <Typography textAlign="center">{"Log out"}</Typography>
                    </MenuItem>
                  )}
                </Menu>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </div>
  );
}
export default ResponsiveAppBar;
