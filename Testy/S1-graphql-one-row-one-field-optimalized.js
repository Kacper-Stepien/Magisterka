import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  stages: [
    { duration: "2m", target: 4000 },
    { duration: "12m", target: 4000 },
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
        orderOptimized(id: $id) {
          order_id
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
      return json.data && json.data.orderOptimized !== null;
    },
  });

  sleep(1);
}
