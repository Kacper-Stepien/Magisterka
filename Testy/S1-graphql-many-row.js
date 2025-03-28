import http from "k6/http";
import { sleep, check } from "k6";

const VUS = parseInt(__ENV.VUS) || 4000;
const ROWS = parseInt(__ENV.ROWS) || 500;

export const options = {
  stages: [
    // { duration: "10m", target: 10000 },
    // { duration: "80m", target: 10000 },
    // { duration: "10m", target: 0 },
    { duration: "4m", target: VUS },
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
          employee_id
          customer_id
          order_date
          required_date
          shipped_date
          ship_via
          freight
          ship_name
          ship_address
          ship_city
          ship_region
          ship_postal_code
          ship_country
      }
    }
  `;

  const variables = { page: PAGE, limit: LIMIT };

  const payload = JSON.stringify({
    query: query,
    variables: variables,
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
      Connection: "keep-alive",
    },
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
