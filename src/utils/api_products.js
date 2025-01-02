import axios from "axios";
import { API_URL } from "../constants";
import { toast } from "sonner";

// Get all products
export const getProducts = async (category = "", page = 1) => {
  try {
    const response = await axios.get(
      API_URL + "/products?page=" + page + "&category=" + category
    ); // http://localhost:5555/products?page=1&category=
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Get a single product
export const getProduct = async (_id) => {
  try {
    const response = await axios.get(API_URL + "/products/" + _id);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// Add new product
export const addNewProduct = async (name, description, price, category) => {
  try {
    const response = await axios.post(API_URL + "/products", {
      name: name,
      description: description,
      price: price,
      category: category,
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// Update product
export const updateProduct = async (
  _id,
  name,
  description,
  price,
  category
) => {
  try {
    const response = await axios.put(API_URL + "/products/" + _id, {
      name: name,
      description: description,
      price: price,
      category: category,
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// Delete product
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(API_URL + "/products/" + id);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
