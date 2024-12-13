import * as React from "react";
import { green, deepOrange, indigo, red, blue } from "@mui/material/colors";
import {
  Stack,
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid2,
} from "@mui/material";

function ProductCard(props) {
  const { products } = props;
  return (
    <Grid2 container rowSpacing={2} columnSpacing={2} sx={{ mb: 5 }}>
      {products.map((product) => (
        <Grid2 item size={{ xs: 12, sm: 6, md: 4 }}>
          <Card variant="outlined" sx={{ height: "100%", width: "100%" }}>
            {" "}
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
                  label={product.category}
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
              >
                Add To Cart
              </Button>
            </CardActions>
            <CardActions
              sx={{ justifyContent: "space-between", marginLeft: 1, mb: 2 }}
            >
              <Button
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
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
}

export default ProductCard;
