import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  stages: [
    { duration: "10m", target: 10000 },
    { duration: "80m", target: 10000 },
    { duration: "10m", target: 0 },
    // { duration: "2m", target: 4000 },
    // { duration: "12m", target: 4000 },
    // { duration: "2m", target: 0 },
  ],
};

const PAGE = 1;
const LIMIT = 100;

export default function () {
  const url = `http://localhost:3000/orders?page=${PAGE}&limit=${LIMIT}`;
  const res = http.get(url);

  check(res, {
    "status is 200": (r) => r.status === 200,
  });
  sleep(1);
}
