import http from "k6/http";
import { sleep, check, group } from "k6";

const VUS = parseInt(__ENV.VUS) || 10;
const ORDER_ID = 10248;

export const options = {
  stages: [
    { duration: "2m", target: VUS },
    { duration: "12m", target: VUS },
    { duration: "2m", target: 0 },
  ],
};

export default function () {
  group("Transaction: Order Details with Products", function () {
    let orderRes = http.get(`http://localhost:3000/orders/${ORDER_ID}`);
    check(orderRes, {
      "order status is 200": (r) => r.status === 200,
    });

    let detailsRes = http.get(
      `http://localhost:3000/order-details/${ORDER_ID}`
    );
    check(detailsRes, {
      "orderDetails status is 200": (r) => r.status === 200,
    });

    let orderDetails = [];
    try {
      orderDetails = detailsRes.json();
    } catch (e) {
      console.log(`Error parsing order-details JSON: ${e}`);
    }

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
