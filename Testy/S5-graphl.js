import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  vus: 1,
  iterations: 1,
};

export default function () {
  const query = `
     mutation {
        createOrder(input: {
            customer_id: "ALFKI",
            employee_id: 5,
            order_date: "2025-03-27",
            required_date: "2025-04-03",
            ship_via: 2,
            freight: 22.5,
            ship_name: "Testowy klient",
            ship_address: "ul. Testowa 123",
            ship_city: "Testowo",
            ship_postal_code: "00-001",
            ship_country: "Polska"
        }) {
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
        }
    }`;

  const variables = {
    input: {
      customer_id: "ALFKI",
      employee_id: 5,
      order_date: new Date().toISOString(),
      required_date: new Date(Date.now() + 7 * 86400000).toISOString(),
      shipped_date: null,
      ship_via: 2,
      freight: 22.5,
      ship_name: "Testowy klient",
      ship_address: "ul. Testowa 123",
      ship_city: "Testowo",
      ship_region: null,
      ship_postal_code: "00-001",
      ship_country: "Polska",
    },
  };

  const payload = JSON.stringify({ query, variables });

  const res = http.post("http://localhost:3000/graphql", payload, {
    headers: { "Content-Type": "application/json" },
  });

  const result = res.json();
  console.log(result); // 👈 wypisze wynik na konsolę

  check(result, {
    "status is 200": () => res.status === 200,
    "has order_id": () => result.data?.createOrder?.order_id !== undefined,
  });

  sleep(1);
}
