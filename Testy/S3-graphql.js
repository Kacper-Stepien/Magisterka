import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  stages: [
    { duration: "2m", target: 5000 },
    { duration: "12m", target: 5000 },
    { duration: "2m", target: 0 },
  ],
};

const ORDER_ID = 10248;

export default function () {
  const query = `
      query ($id: Int!) {
        orderFull(id: $id) {
          order_id
          customer_id
          order_date
          orderDetails {
            product_id
            unit_price
            quantity
            discount
            product {
              product_id
              product_name
              supplier_id
              category_id
              quantity_per_unit
              unit_price
              units_in_stock
              units_on_order
              reorder_level
              discontinued
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
      console.log(json);
      return json.data && json.data.orderFull !== null;
    },
  });

  sleep(1);
}
