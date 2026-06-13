import jwt from "jsonwebtoken";

const token = jwt.sign(
  {
    userId: "1",
    email: "admin@gmail.com",
    role: "ADMIN"
  },
  "my-secret-key"
);

console.log(token);