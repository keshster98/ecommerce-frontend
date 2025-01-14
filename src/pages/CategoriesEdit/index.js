import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCategory, updateCategory } from "../../utils/api_categories";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  TextField,
  Button,
} from "@mui/material";
import Header from "../../components/Header";
import { useCookies } from "react-cookie";
import { getUserToken, isAdmin } from "../../utils/api_auth";
import { toast } from "sonner";

function CategoriesEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies(["currentUser"]);
  const token = getUserToken(cookies);
  const [originalName, setOriginalName] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (!isAdmin(cookies)) {
      navigate("/");
    }
  }, [cookies, navigate]);

  useEffect(() => {
    getCategory(id).then((data) => {
      setLoading(false);
      setOriginalName(data.name);
      setName(data.name);
    });
  }, [id]);

  const handleEditSubmit = async () => {
    if (!name) {
      toast.error(
        "Please make an edit to the category name before submitting!"
      );
    } else {
      const updatedCategory = await updateCategory(id, name, token);
      if (updatedCategory) {
        toast.success(
          `${originalName} has been edited to ${name} successfully!`
        );
        navigate("/categories");
      }
    }
  };

  return (
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
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={originalName === name ? true : false}
                onClick={handleEditSubmit}
              >
                Confirm Edit
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

export default CategoriesEdit;
