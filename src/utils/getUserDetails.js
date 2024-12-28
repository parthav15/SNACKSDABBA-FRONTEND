import { useSelector } from "react-redux";
import { selectUserDetails } from "../redux/slices/authSlice.js";

export const getUserDetails = () => {
  const userDetails = useSelector(selectUserDetails);
  return userDetails;
};
