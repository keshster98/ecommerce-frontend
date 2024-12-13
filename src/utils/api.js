// Import axios
import axios from "axios";

// Static data
const API_URL = "http://localhost:5555";

export const getProducts = async (category = "") => {
  try {
    const response = await axios.get(
      API_URL + "/products?category=" + category
    ); // http://localhost:5555/products?category=
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(API_URL + "/categories"); // http://localhost:5555/categories
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
