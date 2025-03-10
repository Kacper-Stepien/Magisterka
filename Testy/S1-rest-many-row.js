import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  stages: [
    { duration: "1m", target: 5000 },
    { duration: "6m", target: 5000 },
    { duration: "1m", target: 0 },
  ],
};

export default function () {
  const url = `http://localhost:3000/orders?page=1&limit=100`;
  const res = http.get(url);

  check(res, {
    "status is 200": (r) => r.status === 200,
  });
  sleep(1);
}
