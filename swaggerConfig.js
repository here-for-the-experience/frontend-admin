import Swagger from "swagger-client";
import { prefix } from "./src/prefix";

const swaggerConfig = {
  url: `https://${prefix}auth.redevops.store/openapi.json`, // Replace with your Swagger specification URL
};

const initializeSwaggerClient = async () => {
  try {
    const { url } = swaggerConfig;
    const { spec } = await Swagger.resolve({ url });
    const client = await Swagger(spec);

    return client;
  } catch (error) {
    console.error("Error initializing Swagger client:", error);
    throw error;
  }
};

export default initializeSwaggerClient;
