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

const ORDER_ID = 10248;

export default function () {
  const query = `
    query ($id: Int!) {
        order(id: $id) {
            order_id
            customer_id
            order_date
            ship_country
            orderDetails {
                unit_price
                quantity
                product {
                    product_id
                    product_name
                }
            }
        }
    }
  `;

  const variables = { id: ORDER_ID };

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
