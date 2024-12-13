import * as React from "react";
import { useEffect, useState } from "react";
import { getCategories, getProducts } from "../../utils/api";
import { Typography, Box, Container, Button } from "@mui/material";
import { green } from "@mui/material/colors";
import Header from "../../components/Header";
import Filter from "../../components/Filter";
import ProductCard from "../../components/Card";

function Products(props) {
  const [categories, setCategories] = useState([]);
  const [list, setList] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  useEffect(() => {
    getProducts(category).then((data) => {
      setList(data);
    });
  }, [category]);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <Container maxWidth="xl">
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 3,
        }}
      >
        <Typography
          variant="h6"
          component="h6"
          sx={{ pt: 2, fontWeight: "bold" }}
        >
          Products
        </Typography>
        <Button
          variant="contained"
          color="success"
          sx={{ mt: 2, textTransform: "none", backgroundColor: green["A700"] }}
        >
          Add New
        </Button>
      </Box>
      <Box sx={{ mb: 5 }}>
        <Filter
          categories={categories}
          category={category}
          handler={handleChange}
        />
      </Box>
      <Box>
        <ProductCard products={list} />
      </Box>
    </Container>
  );
}

export default Products;
