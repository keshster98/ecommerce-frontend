import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { addNewProduct } from "../../utils/api_products";
import { Container, Typography, Box, TextField, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { toast } from "sonner";
import { useCookies } from "react-cookie";
import { getUserToken } from "../../utils/api_auth";

function ProductAddNew() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentUser"]);
  const token = getUserToken(cookies);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Errors are checked in the backend

    // Trigger the addNewProduct API
    const newProductData = await addNewProduct(
      name,
      description,
      price,
      category,
      token
    );

    // Check if the newProductData exists or not
    if (newProductData) {
      // Show success message
      toast.success("Product has been added successfully!");
      // Redirect back to homepage
      navigate("/");
    }
  };

  return (
    <Container>
      <Header />
      <Card elevation={5} sx={{ boxShadow: 0 }}>
        <CardContent>
          <Typography variant="h4" align="center" mb={4}>
            Add New Product
          </Typography>
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
              fullWidth
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              type="number"
              label="Price"
              required
              fullWidth
              value={price}
              onChange={(event) => setPrice(event.target.value)}
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
            disabled={!name || !price || !category ? true : false}
            onClick={handleFormSubmit}
            sx={{ textTransform: "none" }}
          >
            Submit
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ProductAddNew;
