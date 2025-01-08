import axios from "axios";
import { toast } from "sonner";

import { API_URL } from "../constants";

export const getOrders = async (token) => {
  try {
    const response = await axios.get(API_URL + "/orders", {
      headers: {
        Authorization: "Bearer " + token, // Bearer needs a space after as token is long without spaces
      },
    });
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};

export const createOrder = async (
  customerName,
  customerEmail,
  products,
  totalPrice,
  token
) => {
  try {
    const response = await axios.post(
      API_URL + "/orders",
      {
        customerName,
        customerEmail,
        products,
        totalPrice,
      },
      {
        headers: {
          Authorization: "Bearer " + token, // Bearer needs a space after as token is long without spaces
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};

export const updateOrder = async (_id, status, token) => {
  try {
    const response = await axios.put(
      API_URL + `/orders/${_id}`,
      {
        status,
      },
      {
        headers: {
          Authorization: "Bearer " + token, // Bearer needs a space after as token is long without spaces
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const deleteOrder = async (_id, token) => {
  try {
    const response = await axios.delete(API_URL + `/orders/${_id}`, {
      headers: {
        Authorization: "Bearer " + token, // Bearer needs a space after as token is long without spaces
      },
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
