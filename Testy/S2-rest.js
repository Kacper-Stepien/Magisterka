import http from "k6/http";
import { sleep, check, group } from "k6";

export const options = {
  stages: [
    { duration: "2m", target: 4000 },
    { duration: "12m", target: 4000 },
    { duration: "2m", target: 0 },
  ],
};

const ORDER_ID = 10248;

export default function () {
  group("Transaction: Order Details with Products", function () {
    let orderRes = http.get(`http://localhost:3000/orders/10248`);
    check(orderRes, {
      "order status is 200": (r) => r.status === 200,
    });

    let detailsRes = http.get(
      `http://localhost:3000/order-details?orderId=10248`
    );
    check(detailsRes, {
      "orderDetails status is 200": (r) => r.status === 200,
    });
  });
  sleep(1);
}
