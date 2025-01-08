import { Container, Typography, TextField, Box, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Header from "../../components/Header";
import { toast } from "sonner";
import { updateProduct, getProduct } from "../../utils/api_products";
import { useCookies } from "react-cookie";
import { getUserToken } from "../../utils/api_auth";

function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentUser"]);
  const token = getUserToken(cookies);
  const [loading, setLoading] = useState(true);
  const [originalData, setOriginalData] = useState();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");

  useEffect(() => {
    getProduct(id).then((productData) => {
      setLoading(false);
      setOriginalData(productData);
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category);
      console.log(productData);
    });
  }, [id]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // check for error
    if (!name || !price || !category) {
      toast.error("Please fill out all the required fields");
    } else {
      // trigger the API
      const updatedProduct = await updateProduct(
        id,
        name,
        description,
        price,
        category,
        token
      );

      if (updatedProduct) {
        toast.success("Product has been edited successfully!");
        navigate("/");
      }
    }
  };

  return (
    <>
      <Container>
        <Header />
        <Card sx={{ boxShadow: 0 }}>
          <CardContent>
            <Typography variant="h5" align="center" mb={4}>
              Edit Product
            </Typography>
            {loading ? (
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <CircularProgress color="inherit" />
              </Box>
            ) : (
              <>
                <Box mb={2}>
                  <TextField
                    label="Name"
                    required
                    fullWidth
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    label="Description"
                    required
                    fullWidth
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    label="Price"
                    type="number"
                    required
                    fullWidth
                    value={price}
                    onChange={(event) =>
                      // Because <TextField /> treats price as a string while price from productData.price is a number
                      setPrice(parseFloat(event.target.value))
                    }
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    label="Category"
                    required
                    fullWidth
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                  />
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={
                    originalData.name === name &&
                    originalData.description === description &&
                    originalData.price === price &&
                    originalData.category === category
                      ? true
                      : false
                  }
                  onClick={handleFormSubmit}
                  sx={{ textTransform: "none" }}
                >
                  Edit
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default ProductEdit;
