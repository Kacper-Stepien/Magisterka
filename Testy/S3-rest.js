import http from "k6/http";
import { sleep, check, group } from "k6";

export const options = {
  stages: [
    { duration: "1m", target: 5000 },
    { duration: "6m", target: 5000 },
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

    sleep(0.01);

    let detailsRes = http.get(
      `http://localhost:3000/order-details?orderId=10248`
    );
    check(detailsRes, {
      "orderDetails status is 200": (r) => r.status === 200,
    });

    sleep(0.01);

    let orderDetails = [];
    try {
      orderDetails = detailsRes.json();
    } catch (e) {}

    if (orderDetails && orderDetails.length) {
      for (let i = 0; i < orderDetails.length; i++) {
        let productId = orderDetails[i].product_id;
        let productRes = http.get(
          `http://localhost:3000/products/${productId}`
        );
        check(productRes, {
          "product status is 200": (r) => r.status === 200,
        });
      }
    }
  });
  sleep(1);
}
