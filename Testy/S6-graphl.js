import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  vus: 1,
  iterations: 1,
};

export default function () {
  const query = `
    mutation UpdateOrder($input: UpdateOrderInput!) {
      updateOrder(input: $input) {
        order_id
        ship_city
        freight
      }
    }
  `;

  // Zaktualizuj `order_id` na istniejący w Twojej bazie!
  const variables = {
    input: {
      order_id: 10248, // 👈 ID istniejącego zamówienia
      ship_city: "Zmienione",
      freight: 123.45,
    },
  };

  const payload = JSON.stringify({ query, variables });

  const res = http.post("http://localhost:3000/graphql", payload, {
    headers: { "Content-Type": "application/json" },
  });

  const result = res.json();
  console.log(result); // 👀 wyświetlenie odpowiedzi

  check(result, {
    "status is 200": () => res.status === 200,
    "has order_id": () => result.data?.updateOrder?.order_id !== undefined,
    "city updated": () => result.data?.updateOrder?.ship_city === "Zmienione",
    "freight updated": () => result.data?.updateOrder?.freight === 123.45,
  });

  sleep(1);
}
