import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  vus: 1,
  iterations: 1,
};

export default function () {
  const query = `
      mutation DeleteOrder($id: Int!) {
        deleteOrder(id: $id)
      }
    `;

  const variables = {
    id: 10,
  };

  const payload = JSON.stringify({ query, variables });

  const res = http.post("http://localhost:3000/graphql", payload, {
    headers: { "Content-Type": "application/json" },
  });

  const result = res.json();
  console.log(result); // zobacz co przyszło

  check(result, {
    "status is 200": () => res.status === 200,
    "order deleted": () => result.data?.deleteOrder === true,
  });

  sleep(1);
}
