import http from "k6/http";
import { sleep, check } from "k6";

const VUS = parseInt(__ENV.VUS) || 1000;
const ROWS = parseInt(__ENV.ROWS) || 500;

export const options = {
  stages: [
    // { duration: "10m", target: 10000 },
    // { duration: "80m", target: 10000 },
    // { duration: "10m", target: 0 },
    { duration: "2m", target: VUS },
    { duration: "12m", target: VUS },
    { duration: "2m", target: 0 },
  ],
};

const PAGE = 1;
const LIMIT = ROWS;

export default function () {
  const query = `
    query ($page: Int!, $limit: Int!) {
      orders(page: $page, limit: $limit) {
          order_id
      }
    }
  `;

  const variables = { page: PAGE, limit: LIMIT };

  const payload = JSON.stringify({
    query: query,
    variables: variables,
  });

  const params = {
    headers: { "Content-Type": "application/json" },
  };

  const res = http.post("http://localhost:3000/graphql", payload, params);

  check(res, {
    "GraphQL status is 200": (r) => r.status === 200,
    "GraphQL response has data": (r) => {
      const json = r.json();
      //   console.log(json);
      return json.data && json.data.orders && json.data.orders.length > 0;
    },
  });

  sleep(1);
}
