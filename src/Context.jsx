import { createGlobalState } from "react-hooks-global-state";
const userState = {
  isLoggedIn: false,
  user: {
    id: null,
    name: "",
    email: null,
    address: "",
    phone: "",
    role_id: "",
    verified: false,
  },
};

const { useGlobalState } = createGlobalState(userState);
export { useGlobalState };
