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
import { signup } from "../../utils/api_auth";
import { validateEmail } from "../../utils/email";
import { toast } from "sonner";

function Signup() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["currentUser"]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignupFormSubmit = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address!");
      navigate("/signup");
    } else if (confirmPassword !== password) {
      toast.error("Your password does not match, try again");
      navigate("/signup");
    } else {
      const newUser = await signup(name, email, password);

      if (newUser) {
        // set cookies
        setCookie("currentUser", newUser, {
          maxAge: 60 * 60 * 24 * 30, // second * minutes * hours * days
        });
        toast.success("User has been registered successfully!");
        console.log(newUser);
        navigate("/");
      }
    }
  };

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography variant="h6" component="h6">
          Name
        </Typography>
        <TextField
          fullWidth
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <Typography variant="h6" component="h6" sx={{ mt: 5 }}>
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
        <Typography variant="h6" component="h6" sx={{ mt: 5 }}>
          Confirm Password
        </Typography>
        <TextField
          fullWidth
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          sx={{ ml: 1, mr: 1, mb: 2 }}
          fullWidth
          disabled={
            !name || !email || !password || !confirmPassword ? true : false
          }
          onClick={handleSignupFormSubmit}
        >
          Sign Up
        </Button>
      </CardActions>
    </React.Fragment>
  );
  return (
    <Container maxWidth="sm">
      <Header title="Create a New Account" />
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">{card}</Card>
      </Box>
    </Container>
  );
}

export default Signup;
