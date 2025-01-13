import { useLocation, useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Typography, Divider, Box, Button, Stack } from "@mui/material";
import { isUserLoggedIn } from "../../utils/api_auth";
import { clearCart } from "../../utils/api_cart";

function Header(props) {
  const { title = "Welcome To My Store" } = props;
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["currentUser"]);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isCartPage = location.pathname === "/cart";
  const isOrdersPage = location.pathname === "/orders";
  const isLoginPage = location.pathname === "/login";
  const isSignUpPage = location.pathname === "/signup";

  const handleLogout = () => {
    // clear the cookies
    removeCookie("currentUser");
    // clears the cart each time the user logs out
    clearCart();
    // redirect the user back to login page
    navigate("/");
  };

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
        {isUserLoggedIn(cookies) ? (
          <Button
            variant={isLoginPage ? "outlined" : "contained"}
            LinkComponent={Link}
            sx={{ textTransform: "none" }}
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </Button>
        ) : (
          <>
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
          </>
        )}
      </Stack>
      <Divider sx={{ pt: 3, mb: 3, borderBottomWidth: 3 }}></Divider>
    </Box>
  );
}

export default Header;
