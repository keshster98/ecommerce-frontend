import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Filter from "../../components/Filter";
import ProductCard from "../../components/Card";
import { getProducts } from "../../utils/api_products";
import { getCategories } from "../../utils/api_categories";
import { useCookies } from "react-cookie";
import { isAdmin } from "../../utils/api_auth";
import { Typography, Box, Container, Button } from "@mui/material";
import { ArrowRight, ArrowLeft } from "@mui/icons-material";
import { green } from "@mui/material/colors";

function Products() {
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [list, setList] = useState([]);
  const [category, setCategory] = useState("All");
  const [cookies] = useCookies(["currentUser"]);

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  useEffect(() => {
    getProducts(category, page).then((data) => {
      setList(data);
    });
  }, [category, page]);

  const handleChange = (event) => {
    setCategory(event.target.value);
    setPage(1);
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
        {isAdmin(cookies) ? (
          <Button
            LinkComponent={Link}
            to="/products/new"
            variant="contained"
            color="success"
            sx={{
              mt: 2,
              textTransform: "none",
              backgroundColor: green["A700"],
            }}
          >
            Add New
          </Button>
        ) : null}
      </Box>
      <Box sx={{ mb: 5 }}>
        <Filter
          categories={categories}
          category={category}
          handler={handleChange}
        />
      </Box>
      <Box>
        <ProductCard
          products={list}
          setProducts={setList}
          setCategories={setCategories}
          category={category}
          page={page}
        />
      </Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ pb: 5 }}
      >
        <Button
          variant="contained"
          color="secondary"
          disabled={page === 1 ? true : false}
          onClick={() => setPage(page - 1)}
        >
          <ArrowLeft />
          Prev
        </Button>
        <span>Page {page}</span>
        <Button
          variant="contained"
          color="secondary"
          disabled={list.length === 0 ? true : false}
          onClick={() => setPage(page + 1)}
        >
          Next
          <ArrowRight />
        </Button>
      </Box>
    </Container>
  );
}

export default Products;
