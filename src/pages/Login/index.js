import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import * as React from "react";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Header from "../../components/Header";
import { login } from "../../utils/api_auth";
import { validateEmail } from "../../utils/email";
import { toast } from "sonner";

function Signup() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["currentUser"]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginFormSubmit = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address!");
      navigate("/login");
    } else {
      const verifyUser = await login(email, password);

      if (verifyUser) {
        // set cookies
        setCookie("currentUser", verifyUser, {
          maxAge: 60 * 60 * 24 * 30, // second * minutes * hours * days
        });
        toast.success("User has been logged in successfully!");
        console.log(verifyUser);
        navigate("/");
      }
    }
  };

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography variant="h6" component="h6">
          Email
        </Typography>
        <TextField
          fullWidth
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Typography variant="h6" component="h6" sx={{ mt: 5 }}>
          Password
        </Typography>
        <TextField
          fullWidth
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          sx={{ ml: 1, mr: 1, mb: 2 }}
          fullWidth
          disabled={!email || !password ? true : false}
          onClick={handleLoginFormSubmit}
        >
          Login
        </Button>
      </CardActions>
    </React.Fragment>
  );
  return (
    <Container maxWidth="sm">
      <Header title="Login to Your Account" />
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">{card}</Card>
      </Box>
    </Container>
  );
}

export default Signup;
