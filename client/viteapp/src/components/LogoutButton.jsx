import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@mui/material-next/Button';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button variant="filledTonal" className="login-logout-button" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} sx={{ backgroundColor: "#C1D7AE", "&:hover": { backgroundColor: "#d2e7c0" }}}>Log Out</Button>
  );
};

export default LogoutButton;