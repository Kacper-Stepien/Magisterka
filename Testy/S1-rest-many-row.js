import http from "k6/http";
import { sleep, check } from "k6";

const VUS = parseInt(__ENV.VUS) || 10;
const ROWS = parseInt(__ENV.ROWS) || 500;

export const options = {
  stages: [
    // { duration: "10m", target: 10000 },
    // { duration: "80m", target: 10000 },
    // { duration: "10m", target: 0 },
    { duration: "2m", target: VUS },
    { duration: "12m", target: VUS },
    { duration: "2m", target: 0 },
  ],
};

const PAGE = 1;
const LIMIT = ROWS;

export default function () {
  const url = `http://localhost:3000/orders?page=${PAGE}&limit=${LIMIT}`;
  const res = http.get(url);

  check(res, {
    "status is 200": (r) => r.status === 200,
  });
  sleep(1);
}
