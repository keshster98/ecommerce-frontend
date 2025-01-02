import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { login } from "../../utils/api_login";
import { toast } from "sonner";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginFormSubmit = async (event) => {
    event.preventDefault();

    const verifyUser = await login(email, password);

    if (verifyUser) {
      toast.success("User has been registered successfully!");
      console.log(verifyUser);
      navigate("/");
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
          Sign Up
        </Button>
      </CardActions>
    </React.Fragment>
  );
  return (
    <Container maxWidth="xl">
      <Header title="Login to Your Account" />
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">{card}</Card>
      </Box>
    </Container>
  );
}

export default Signup;
