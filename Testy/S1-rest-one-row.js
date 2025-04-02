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

const MIN_ORDER_ID = 10248;
const MAX_ORDER_ID = 11077;

export default function () {
  const randomOrderId =
    Math.floor(Math.random() * (MAX_ORDER_ID - MIN_ORDER_ID + 1)) +
    MIN_ORDER_ID;
  const url = `http://localhost:3000/orders/${randomOrderId}`;
  const res = http.get(url);

  check(res, {
    "status is 200": (r) => r.status === 200,
  });
  sleep(1);
}
