import { Link } from "react-router-dom";
import { deleteProduct, getProducts } from "../../utils/api_products";
import { getCategories } from "../../utils/api_categories";
import { useCookies } from "react-cookie";
import { isAdmin, getUserToken } from "../../utils/api_auth";
import { green, deepOrange, indigo, red, blue } from "@mui/material/colors";
import {
  Stack,
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid2,
} from "@mui/material";
import { toast } from "sonner";
import { API_URL } from "../../constants";

function ProductCard(props) {
  const { products, setProducts, setCategories, category, page } = props; // setProducts, category, page
  const [cookies] = useCookies(["currentUser"]);
  const token = getUserToken(cookies);
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const duplicateProduct = cart.find((inCart) => inCart._id === product._id);
    if (!duplicateProduct) {
      cart.push({
        _id: product._id,
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        quantity: 1,
      });
    } else {
      duplicateProduct.quantity += 1;
    }
    let stringedNewCart = JSON.stringify(cart);
    localStorage.setItem("cart", stringedNewCart);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmed) {
      const deleted = await deleteProduct(id, token);
      if (deleted) {
        // get the latest products data from the API again so that it shows on frontend side
        const latestProducts = await getProducts(category, page);
        const latestCategories = await getCategories();
        setProducts(latestProducts);
        setCategories(latestCategories);
        toast.success("Product deleted successfully");
      } else {
        toast.error("Failed to delete product");
      }
    }
  };
  return (
    <Grid2 container rowSpacing={2} columnSpacing={2} sx={{ mb: 5 }}>
      {products.length > 0 ? (
        products.map((product) => (
          <Grid2 item size={{ xs: 12, sm: 6, md: 4 }}>
            <Card variant="outlined" sx={{ height: "100%", width: "100%" }}>
              {" "}
              {product.image ? (
                <CardMedia
                  component="img"
                  image={`${API_URL}/${product.image}`}
                />
              ) : null}
              <CardContent>
                <Typography variant="subtitle1" component="subtitle1">
                  {product.name}
                </Typography>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Chip
                    label={"$" + product.price}
                    sx={{
                      backgroundColor: green[50],
                      color: green[500],
                      fontWeight: "bold",
                      mt: 2,
                    }}
                  />
                  <Chip
                    label={product.category.name}
                    sx={{
                      backgroundColor: deepOrange[50],
                      color: deepOrange[500],
                      fontWeight: "bold",
                      mt: 2,
                    }}
                  />
                </Stack>
              </CardContent>
              <CardActions sx={{ pt: 0, marginLeft: 1, marginRight: 1 }}>
                <Button
                  variant="contained"
                  size="medium"
                  sx={{
                    backgroundColor: blue[600],
                    width: "100%",
                    textTransform: "none", // Because default style for MUI buttons include textTransform: "uppercase"
                  }}
                  onClick={() => {
                    addToCart(product);
                    toast.success("Product successfully added to cart!");
                  }}
                >
                  Add To Cart
                </Button>
              </CardActions>
              <CardActions
                sx={{ justifyContent: "space-between", marginLeft: 1, mb: 2 }}
              >
                {isAdmin(cookies) ? (
                  <>
                    <Button
                      LinkComponent={Link}
                      to={`/products/${product._id}/edit`}
                      variant="contained"
                      size="medium"
                      sx={{
                        backgroundColor: indigo["A200"],
                        borderRadius: "50px",
                        textTransform: "none", // Because default style for MUI buttons include textTransform: "uppercase"
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      size="medium"
                      sx={{
                        backgroundColor: red[500],
                        marginRight: 1,
                        borderRadius: "50px",
                        textTransform: "none", // Because default style for MUI buttons include textTransform: "uppercase"
                      }}
                      onClick={() => {
                        handleDelete(product._id);
                      }}
                    >
                      Delete
                    </Button>
                  </>
                ) : null}
              </CardActions>
            </Card>
          </Grid2>
        ))
      ) : (
        <Grid2 size={12}>
          <Card sx={{ boxShadow: 0 }}>
            <CardContent>
              <Typography variant="body1" align="center">
                No more products found.
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
      )}
    </Grid2>
  );
}

export default ProductCard;
