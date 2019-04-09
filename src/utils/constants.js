export const capitalizeStatus = string => string.charAt(0).toUpperCase() + string.slice(1);

export const BASE_API_URL = process.env.NODE_ENV !== "production"
  ? "http://localhost:3030"
  : "https://teepha-send-it.herokuapp.com";
