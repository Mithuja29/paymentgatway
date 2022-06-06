const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51L7GHqSIkINhGnuzS00BKYH4hEqcY5nHkusKNQCE9hEdHY10tQ6SrjRPd5OOJSZPnnVKH2xl7o3oK1ZrVWJprzxd00ZNWsYoYy");

const {v4:uuidv4}= require("uuid");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.send("its working");
});

app.post("/payment",(req,res)=>{
  const {product, token} = req.body;
  const transactionKey = uuidv4();
  return stripe.customers.create({
      email:token.email,
      source:token.id
  }).then((customer)=>{
      stripe.charges.create({
          amount:product.price,
          currency:"inr",
          customer:customer.id,
          receipt_email:token.email,
          description:product.name
      })
      .then((result)=>{
          res.json(result);
      })
      .catch((err)=>{
          console.log(err);
      });
  });
});


app.listen(5000, () => {
    console.log("Sever has been started in 5000");
});

