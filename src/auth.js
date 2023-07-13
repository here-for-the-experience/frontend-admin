import axios from "axios";
import { prefix } from "./prefix";

export default axios.create({
  baseURL: `https://${prefix}auth.redevops.store`,
  timeout: 30000,
  // withCredentials: true,
});
