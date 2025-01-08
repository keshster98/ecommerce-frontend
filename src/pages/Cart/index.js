import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Button,
} from "@mui/material";
import { red } from "@mui/material/colors";

function Cart() {
  const [cartList, setCartList] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const totalPrice = cartList.reduce((total, list) => {
    return total + list.price * list.quantity;
  }, 0);

  const handleCartDelete = (listID) => {
    const updatedCart = cartList.filter((list) => list._id !== listID);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartList(updatedCart);
  };

  return (
    <Container maxWidth="xl">
      <Header title="My Cart" />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: "left" }}>
                <strong>Product</strong>
              </TableCell>
              <TableCell sx={{ textAlign: "left" }}>
                <strong>Price</strong>
              </TableCell>
              <TableCell sx={{ textAlign: "left" }}>
                <strong>Quantity</strong>
              </TableCell>
              <TableCell sx={{ textAlign: "left" }}>
                <strong>Total</strong>
              </TableCell>
              <TableCell sx={{ textAlign: "left" }}>
                <strong>Action</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartList.length > 0 ? (
              cartList.map((list) => (
                <TableRow key={list._id}>
                  <TableCell sx={{ textAlign: "left" }}>{list.name}</TableCell>
                  <TableCell sx={{ textAlign: "left" }}>
                    ${list.price}
                  </TableCell>
                  <TableCell sx={{ textAlign: "left" }}>
                    {list.quantity}
                  </TableCell>
                  <TableCell sx={{ textAlign: "left" }}>
                    ${(list.price * list.quantity).toFixed(2)}
                  </TableCell>
                  <TableCell sx={{ textAlign: "left" }}>
                    <Button
                      variant="contained"
                      sx={{ textTransform: "none", backgroundColor: red[800] }}
                      onClick={() => handleCartDelete(list._id)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Your cart is empty.
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell
                colSpan={3}
                align="left"
                sx={{
                  fontWeight: "bold",
                }}
              >
                Grand Total
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontWeight: "bold",
                }}
              >
                ${totalPrice.toFixed(2)}
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  sx={{ textTransform: "none" }}
                  disabled={cartList.length === 0 ? true : false}
                  LinkComponent={Link}
                  to="/checkout"
                >
                  Checkout
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Cart;
