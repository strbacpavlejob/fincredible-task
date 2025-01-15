import axios from "axios";

// I think issue is in import of the env file
const API_KEY = import.meta.env.API_KEY;

export const getToken = async () => {
  try {
    const response = await axios.get(
      "https://a0ba5803-e873-42b3-b311-665d53ea3479.mock.pstmn.io/token",
      {
        headers: {
          "x-api-key": API_KEY,
        },
      }
    );
    sessionStorage.setItem("sessionToken", response.data);
  } catch (e) {
    console.log("Error in getToken", e);
  }
};

export const getBankData = async () => {
  const token = sessionStorage.getItem("sessionToken");
  try {
    const response = await axios.get(
      "https://a0ba5803-e873-42b3-b311-665d53ea3479.mock.pstmn.io/bank-data",
      {
        headers: {
          "x-api-key": API_KEY,
        },
        params: {
          token: token,
        },
      }
    );
    return response.data;
  } catch (e) {
    console.log("Error in getToken", e);
  }
};
