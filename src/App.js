import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Products from "./pages/Products";
import ProductAddNew from "./pages/ProductAddNew";
import ProductEdit from "./pages/ProductEdit";
import Cart from "./pages/Cart";
import PaymentVerify from "./pages/PaymentVerify";
import Orders from "./pages/Orders";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <div className="App">
      {" "}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products/new" element={<ProductAddNew />} />
          <Route path="/products/:id/edit" element={<ProductEdit />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/verify-payment" element={<PaymentVerify />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
      <Toaster richColors position="top-right" />
    </div>
  );
}

export default App;
