import http from "k6/http";
import { sleep, check } from "k6";

const VUS = parseInt(__ENV.VUS) || 4000;

export const options = {
  stages: [
    { duration: "2m", target: VUS },
    { duration: "12m", target: VUS },
    { duration: "2m", target: 0 },
  ],
};

const MIN_ORDER_ID = 10248;
const MAX_ORDER_ID = 11077;

export default function () {
  const randomOrderId =
    Math.floor(Math.random() * (MAX_ORDER_ID - MIN_ORDER_ID + 1)) +
    MIN_ORDER_ID;

  const query = `
      query ($id: Int!) {
        order(id: $id) {
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

  const variables = { id: randomOrderId };

  const payload = JSON.stringify({
    query: query,
    variables: variables,
  });

  const params = {
    headers: { "Content-Type": "application/json" },
  };

  let res = http.post("http://localhost:3000/graphql", payload, params);

  check(res, {
    "GraphQL status is 200": (r) => r.status === 200,
    "GraphQL response has data": (r) => {
      const json = r.json();
      //   console.log(json);
      return json.data && json.data.order !== null;
    },
  });

  sleep(1);
}
