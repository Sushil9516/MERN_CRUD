const express = require('express');
const cors = require('cors');
const app = express();
require('./db/config');
const User = require("./db/User");
const Product = require("./db/Product")

const Jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';

app.use(cors());
app.use(express.json());

app.post('/register', async (req, res) => {
  const data = await User(req.body);
  result = await data.save();
  result = result.toObject();
  delete result.password;
  console.log(result);
  if (result) {
    Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        res.send({ result: "Something Went Wrong , Please try after some time" });
      }
      res.send({result,  auth: token });
    })

  }});

app.post('/login', async (req, res) => {
  console.log(req.body);
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password")
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send({ result: "Something Went Wrong , Please try after some time" });
        }
        res.send({user,  auth: token });
      })
    }
  }
})

app.post("/add-product", async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
})

app.get("/products", async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  }
  else {
    res.send({ result: "No result found" });
  }
})

app.delete("/product/:id", async (req, res) => {
  let result = await Product.deleteOne({ _id: req.params.id });
  res.send(result)
})

app.get("/product/:id", async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  }
  else {
    res.send({ data: " No  Product found" });
  }
})


app.put("/product/:id", async (req, res) => {
  let result = await Product.updateOne({ _id: req.params.id }, { $set: req.body });
  res.send(result)
})

app.get('/search/:key', verifyToken , async (req, res) => {
  let result = await Product.find({
    "$or": [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } }
    ]
  })
  res.send(result);
})


function verifyToken(req, res, next){
  const token = req.headers['authorization']
  console.log("middleware called", token);
   next()
}

app.listen(5000)
