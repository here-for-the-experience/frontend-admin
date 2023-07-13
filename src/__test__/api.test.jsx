import { expect, test } from "@jest/globals";
import axios from "axios";
import { prefix } from "../prefix";

test("Test API response", async () => {
  const response = await axios.get(
    `https://${prefix}api.redevops.store/openapi.json`
  );
  expect(response.status).toBe(200);
});

test("Test API data", async () => {
  const response = await axios.get(
    `https://${prefix}api.redevops.store/openapi.json`
  );
  expect(response.data.paths[`/create`].post.operationId).toBe(
    "create_vaccination_create_post"
  );
});

test("Test API data", async () => {
  const response = await axios.get(
    `https://${prefix}api.redevops.store/openapi.json`
  );
  expect(response.data.paths[`/allvaccines`].post.operationId).toBe(
    "allvaccine_allvaccines_post"
  );
});

test("Test API data", async () => {
  const response = await axios.get(
    `https://${prefix}api.redevops.store/openapi.json`
  );
  expect(response.data.paths[`/approve`].post.operationId).toBe(
    "approveVaccine_approve_post"
  );
});

test("Test API data", async () => {
  const response = await axios.get(
    `https://${prefix}api.redevops.store/openapi.json`
  );
  expect(response.data.paths[`/myvaccine`].post.operationId).toBe(
    "my_vaccine_myvaccine_post"
  );
});

// test("Test API type", async () => {
//   const response = await axios.get(
//     "https://${prefix}api.redevops.store/openapi.json"
//   );
//   for (let i = 0; i < path.length; i++) {
//     expect(
//       response.data.components.schemas[
//         `Body_home_${defaultPath}_${path[i]}_${method}`
//       ].properties
//     ).toStrictEqual(type);
//   }
// });
