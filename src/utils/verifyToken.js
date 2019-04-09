import jwtDecode from "jwt-decode";


/**
 * @description verifies/authentication token
 * @function
 *
 * @returns { number } 1 or 0, representing valid or invalid token
 */
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
