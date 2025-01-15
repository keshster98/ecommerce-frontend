import { useLocation, useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Typography, Divider, Box, Button, Stack } from "@mui/material";
import { isUserLoggedIn, isAdmin } from "../../utils/api_auth";
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
  const isCategoriesPage = location.pathname === "/categories";

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

      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        gap={"10px"}
      >
        <Stack className="left" flexDirection={"row"} gap={"10px"}>
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
          {isUserLoggedIn(cookies) && (
            <Button
              variant={isOrdersPage ? "outlined" : "contained"}
              LinkComponent={Link}
              to="/orders"
              sx={{ textTransform: "none" }}
            >
              Orders
            </Button>
          )}
          {isAdmin(cookies) && (
            <Button
              variant={isCategoriesPage ? "outlined" : "contained"}
              LinkComponent={Link}
              to="/categories"
              sx={{ textTransform: "none" }}
            >
              Categories
            </Button>
          )}
        </Stack>
        <Stack
          className="right"
          flexDirection={"row"}
          alignItems={"center"}
          gap={"10px"}
        >
          {isUserLoggedIn(cookies) ? (
            <>
              {" "}
              <Typography>Current User: {cookies.currentUser.name}</Typography>
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
            </>
          ) : (
            <>
              {" "}
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
                sx={{ textTransform: "none", marginRight: "auto" }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Stack>
      </Stack>
      <Divider sx={{ pt: 3, mb: 3, borderBottomWidth: 3 }}></Divider>
    </Box>
  );
}

export default Header;
