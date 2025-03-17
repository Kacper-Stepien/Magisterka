import http from "k6/http";
import { sleep, check } from "k6";

const VUS = parseInt(__ENV.VUS) || 10;

export const options = {
  stages: [
    { duration: "2m", target: VUS },
    { duration: "12m", target: VUS },
    { duration: "2m", target: 0 },
  ],
};

const ORDER_ID = 10248;

export default function () {
  const url = `http://localhost:3000/orders/${ORDER_ID}/details`;
  const res = http.get(url);

  check(res, {
    "status is 200": (r) => r.status === 200,
  });
  sleep(1);
}
