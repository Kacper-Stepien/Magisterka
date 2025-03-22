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
            employee_id
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
            orderDetails {
                order_id
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
                    supplier {
                        supplier_id
                        company_name
                        contact_name
                        contact_title
                        address
                        city
                        region
                        postal_code
                        country
                        phone
                        fax
                        homepage
                    }
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
