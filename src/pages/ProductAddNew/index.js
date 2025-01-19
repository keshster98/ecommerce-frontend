import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { addNewProduct } from "../../utils/api_products";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { toast } from "sonner";
import { useCookies } from "react-cookie";
import { getUserToken, isAdmin } from "../../utils/api_auth";
import ButtonUpload from "../../components/ButtonUpload";
import { uploadImage } from "../../utils/api_image";
import { API_URL } from "../../constants";
import { getCategories } from "../../utils/api_categories";

function ProductAddNew() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentUser"]);
  const token = getUserToken(cookies);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState("");

  useEffect(() => {
    if (!isAdmin(cookies)) {
      navigate("/");
    }
  }, [cookies, navigate]);

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Errors are checked in the backend

    // Trigger the addNewProduct API
    const newProductData = await addNewProduct(
      name,
      description,
      price,
      category,
      image,
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

  const handleImageUpload = async (files) => {
    // trigger the upload API
    const { image_url = "" } = await uploadImage(files[0]);
    // to set the uploaded image
    setImage(image_url);
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
            <FormControl sx={{ minWidth: "100%" }}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category"
                onChange={(event) => {
                  setCategory(event.target.value);
                }}
                sx={{
                  width: "100%",
                }}
              >
                {categories.map((category) => {
                  return (
                    <MenuItem value={category._id}>{category.name}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <Box mb={2}>
            {image !== "" ? (
              <>
                <div>
                  <img
                    src={`${API_URL}/${image}`}
                    style={{
                      width: "100%",
                      maxWidth: "300px",
                    }}
                  />
                </div>
                <button onClick={() => setImage("")}>Remove</button>
              </>
            ) : (
              <ButtonUpload
                onFileUpload={(files) => {
                  // handleImageUpload
                  if (files && files[0]) {
                    handleImageUpload(files);
                  }
                }}
              />
            )}
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
