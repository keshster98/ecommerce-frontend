import axios from "axios";
import { API_URL } from "../constants";

// Get all categories
export const getCategories = async () => {
  try {
    const response = await axios.get(API_URL + "/categories");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Get one category
export const getCategory = async (id) => {
  try {
    const response = await axios.get(API_URL + "/categories/" + id);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Add a new category
export const addNewCategory = async (name, token) => {
  try {
    const response = await axios.post(
      API_URL + "/categories",
      { name: name },
      {
        headers: {
          Authorization: "Bearer " + token, // Bearer needs a space after as token is long without spaces
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Update a category
export const updateCategory = async (id, name, token) => {
  try {
    const response = await axios.put(
      API_URL + "/categories/" + id,
      {
        name: name,
      },
      {
        headers: {
          Authorization: "Bearer " + token, // Bearer needs a space after as token is long without spaces
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Delete a category
export const deleteCategory = async (id, token) => {
  try {
    const response = await axios.delete(API_URL + "/categories/" + id, {
      headers: {
        Authorization: "Bearer " + token, // Bearer needs a space after as token is long without spaces
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
