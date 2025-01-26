import axios from "axios";

export const isValidUrl = async (originalUrl: string) => {
  try {
    const response = await axios.head(originalUrl);

    return response.status;
  } catch (error) {
    console.log("Error al validar url:", error);
    return false;
  }
};
