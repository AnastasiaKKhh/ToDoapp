import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";

import { LeaveArrow } from "../assets/arrows";

import "../index.css"

import { useNavigate } from "react-router-dom";
import { AccountIcon } from "../assets/mainAccountIcon";

 const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  let navigate = useNavigate();

  const logOut = () => {
    window.localStorage.clear();

    navigate("/login", { replace: true });
  };

  return (
    <div>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
       <AccountIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        <MenuItem onClick={logOut}>
        <p className="menuItem_logout">Logout</p>
        <LeaveArrow/>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default AccountMenu