import { useLocation, Link } from "react-router-dom";
import { Typography, Divider, Box, Button, Stack } from "@mui/material";

function Header(props) {
  const { title = "Welcome To My Store" } = props;
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isCartPage = location.pathname === "/cart";
  const isOrdersPage = location.pathname === "/orders";
  const isLoginPage = location.pathname === "/login";
  const isSignUpPage = location.pathname === "/signup";

  return (
    <Box sx={{ textAlign: "center", pt: 5 }}>
      <Typography
        variant="h5"
        component="h5"
        sx={{ fontWeight: "bold", pb: "10px" }}
      >
        {title}
      </Typography>
      <Stack flexDirection={"row"} justifyContent={"center"} gap={"10px"}>
        <Button
          variant={isHomePage ? "outlined" : "contained"}
          LinkComponent={Link}
          to="/"
          sx={{ textTransform: "none" }}
        >
          Home
        </Button>
        <Button
          variant={isCartPage ? "outlined" : "contained"}
          LinkComponent={Link}
          to="/cart"
          sx={{ textTransform: "none" }}
        >
          Cart
        </Button>
        <Button
          variant={isOrdersPage ? "outlined" : "contained"}
          LinkComponent={Link}
          to="/orders"
          sx={{ textTransform: "none" }}
        >
          Orders
        </Button>
        <Button
          variant={isLoginPage ? "outlined" : "contained"}
          LinkComponent={Link}
          to="/login"
          sx={{ textTransform: "none" }}
        >
          Login
        </Button>
        <Button
          variant={isSignUpPage ? "outlined" : "contained"}
          LinkComponent={Link}
          to="/signup"
          sx={{ textTransform: "none" }}
        >
          Sign Up
        </Button>
      </Stack>
      <Divider sx={{ pt: 3, mb: 3, borderBottomWidth: 3 }}></Divider>
    </Box>
  );
}

export default Header;
