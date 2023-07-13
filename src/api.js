import axios from "axios";
import { prefix } from "./prefix";

export default axios.create({
  baseURL: `https://${prefix}api.redevops.store`,
  timeout: 30000,
  // withCredentials: true,
});
