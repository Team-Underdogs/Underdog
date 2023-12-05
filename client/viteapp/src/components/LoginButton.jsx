import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@mui/material-next/Button';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button variant="filledTonal" onClick={() => loginWithRedirect()} sx={{ backgroundColor: "#C1D7AE", "&:hover": { backgroundColor: "#d2e7c0" }}}>Log In</Button>
  
};

export default LoginButton;