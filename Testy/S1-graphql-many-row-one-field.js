import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  vus: 1,
  time: "1s",
  // stages: [
  //   // { duration: "10m", target: 10000 },
  //   // { duration: "80m", target: 10000 },
  //   // { duration: "10m", target: 0 },
  //   { duration: "2m", target: 4000 },
  //   { duration: "12m", target: 4000 },
  //   { duration: "2m", target: 0 },
  // ],
};

const PAGE = 1;
const LIMIT = 500;

export default function () {
  const query = `
    query ($page: Int!, $limit: Int!) {
      ordersOptimized(page: $page, limit: $limit) {
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
      console.log(json);
      return (
        json.data &&
        json.data.ordersOptimized &&
        json.data.ordersOptimized.length > 0
      );
    },
  });

  sleep(1);
}
