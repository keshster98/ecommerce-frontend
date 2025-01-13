import { Container, Typography, TextField, Box, Button } from "@mui/material";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
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
import { getCategories } from "../../utils/api_categories";
import { API_URL } from "../../constants";
import ButtonUpload from "../../components/ButtonUpload";
import { uploadImage } from "../../utils/api_image";

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
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState("");

  useEffect(() => {
    getProduct(id).then((productData) => {
      setLoading(false);
      setOriginalData(productData);
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category);
      setImage(productData.image);
      console.log(productData);
    });
  }, [id]);

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

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
        image,
        token
      );

      if (updatedProduct) {
        toast.success("Product has been edited successfully!");
        navigate("/");
      }
    }
  };

  const handleImageUpload = async (files) => {
    // trigger the upload API
    const { image_url = "" } = await uploadImage(files[0]);
    // to set the uploaded image
    setImage(image_url);
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
                  <FormControl sx={{ minWidth: "100%" }}>
                    <InputLabel id="demo-simple-select-label">
                      Category
                    </InputLabel>
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
                          <MenuItem value={category._id}>
                            {category.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
                <Box mb={2}>
                  {image && image !== "" ? (
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
                  disabled={
                    originalData.name === name &&
                    originalData.description === description &&
                    originalData.price === price &&
                    originalData.category === category &&
                    originalData.image === image
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
