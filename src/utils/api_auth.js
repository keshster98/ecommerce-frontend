import axios from "axios";
import { API_URL } from "../constants";
import { toast } from "sonner";

export const signup = async (name, email, password) => {
  try {
    const response = await axios.post(API_URL + "/auth/signup", {
      name: name,
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(API_URL + "/auth/login", {
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const getCurrentUser = (cookies) => {
  return cookies.currentUser ? cookies.currentUser : null;
};

export const isUserLoggedIn = (cookies) => {
  return getCurrentUser(cookies) ? true : false;
};

export const isAdmin = (cookies) => {
  const currentUser = getCurrentUser(cookies);
  return currentUser && currentUser.role === "admin" ? true : false;
};

// Function to access cookies.currentUser.token
export const getUserToken = (cookies) => {
  const currentUser = getCurrentUser(cookies);
  return currentUser && currentUser.token ? currentUser.token : "";
};
