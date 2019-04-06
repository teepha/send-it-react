import jwtDecode from "jwt-decode";

export const verifyToken = () => {
  const token = localStorage.token;
  let verified = {};
  if (token) {
    const userData = jwtDecode(token);
    if (userData !== null) {
      verified = userData;
    } else {
      verified = null;
    }
  } else {
    verified = null;
  }
  return verified;
};
