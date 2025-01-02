import axios from "axios";
import { API_URL } from "../constants";
import { toast } from "sonner";

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
