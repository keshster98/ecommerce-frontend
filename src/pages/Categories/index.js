import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../../components/Header";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";
import {
  getCategories,
  addNewCategory,
  deleteCategory,
} from "../../utils/api_categories";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { getUserToken, isAdmin } from "../../utils/api_auth";

function Categories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [cookies] = useCookies(["currentUser"]);
  const token = getUserToken(cookies);

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

  const handleAddCategory = async () => {
    const addNew = await addNewCategory(name, token);

    if (addNew) {
      toast.success(
        `${name} has been successfully added as an additional category!`
      );
      setName("");
      const updatedList = await getCategories();
      setCategories(updatedList);
    }
  };

  const handleDeleteCategory = async (id, name) => {
    const deleteCat = await deleteCategory(id, token);

    if (deleteCat) {
      toast.success(
        `${name} has been successfully deleted from the list of categories!`
      );
      const updatedList = await getCategories();
      setCategories(updatedList);
    }
  };

  return (
    <Container maxWidth="xl">
      <Header />
      <Typography variant="h5" component="h5" sx={{ fontWeight: "bold" }}>
        Categories
      </Typography>
      <Box mb={5} display={"flex"} gap={2} pt={2}>
        <TextField
          label="Category Name"
          placeholder="Category Name"
          fullWidth
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none" }}
          onClick={handleAddCategory}
        >
          Add
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography>
                  <strong>Name</strong>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography>
                  <strong>Actions</strong>
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((cat) => (
              <TableRow key={cat._id}>
                <TableCell>{cat.name}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ textTransform: "none", marginRight: "10px" }}
                    LinkComponent={Link}
                    to={`/categories/${cat._id}/edit`}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ textTransform: "none" }}
                    onClick={() => handleDeleteCategory(cat._id, cat.name)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Categories;
