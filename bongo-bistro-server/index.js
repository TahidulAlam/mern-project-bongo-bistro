// tahidcse
// Z730isvK91QgQgG0
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
// const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
// const morgan = require("morgan");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const port = process.env.PORT || 5000;

// middleware
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
// app.use(cookieParser());
// app.use(morgan("dev"));
// const verifyToken = async (req, res, next) => {
//   const token = req.cookies?.token;
//   console.log(token);
//   if (!token) {
//     return res.status(401).send({ message: "unauthorized access" });
//   }
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//     if (err) {
//       console.log(err);
//       return res.status(401).send({ message: "unauthorized access" });
//     }
//     req.user = decoded;
//     next();
//   });
// };

const client = new MongoClient(process.env.DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    const bongoBistroDB = client.db("bongoBistroDB");
    const menuCollection = bongoBistroDB.collection("menuCollection");
    const reviewsCollection = bongoBistroDB.collection("reviewsCollection");
    const cartCollection = bongoBistroDB.collection("cartCollection");
    const usersCollection = bongoBistroDB.collection("usersCollection");
    const paymentCollection = bongoBistroDB.collection("paymentCollection");
    // auth related api
    // app.post("/jwt", async (req, res) => {
    //   const user = req.body;
    //   console.log("I need a new jwt", user);
    //   const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    //     expiresIn: "365d",
    //   });
    //   res
    //     .cookie("token", token, {
    //       httpOnly: true,
    //       secure: process.env.NODE_ENV === "production",
    //       sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    //     })
    //     .send({ success: true });
    // });

    // Logout
    // app.get("/logout", async (req, res) => {
    //   try {
    //     res
    //       .clearCookie("token", {
    //         maxAge: 0,
    //         secure: process.env.NODE_ENV === "production",
    //         sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    //       })
    //       .send({ success: true });
    //     console.log("Logout successful");
    //   } catch (err) {
    //     res.status(500).send(err);
    //   }
    // });
    const verifyToken = (req, res, next) => {
      if (!req.headers.authorization) {
        return res.status(401).send({ message: " forbidden access" });
      }
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if (error) {
          return res.status(401).send({ message: " forbidden access" });
        }
        req.decoded = decoded;
        next();
      });
    };
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded?.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      const isAdmin = user?.role === "admin";
      if (!isAdmin) {
        return res.status(403).send({ message: "forbidden access" });
      }
      next();
    };
    app.post("/jwt", async (req, res) => {
      try {
        const user = req.body;
        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "1h",
        });
        res.send({ token });
      } catch (error) {
        console.log(error);
      }
    });

    app.post("/api/bb/users", async (req, res) => {
      try {
        const user = req.body;
        const query = { email: user.email };
        const isExist = await usersCollection.findOne(query);
        if (isExist) {
          return res.send({ message: "user already exists", insertedId: null });
        }
        const result = await usersCollection.insertOne(user);
        res.send(result);
      } catch (error) {
        console.log(error);
      }
    });
    app.get("/api/bb/users", verifyToken, verifyAdmin, async (req, res) => {
      try {
        const result = await usersCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.log(error);
      }
    });
    app.get("/api/bb/users/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      if (email !== req.decoded.email) {
        return res.status(403).send({ message: "unauthorised access" });
      }
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      // console.log(user);
      // console.log(user?.name);
      // console.log(user?.role);
      let admin = false;
      if (user) {
        admin = user?.role === "admin";
        // admin = user?.name === "Tahid Official";
        // console.log("name :", admin);
        // console.log("role", role);
      }
      res.send({ admin });
    });

    app.patch("/api/bb/users/admin/:id", verifyToken, async (req, res) => {
      try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: {
            role: "admin",
          },
        };
        const result = await usersCollection.updateOne(filter, updateDoc);
        res.send(result);
      } catch (error) {
        console.log(error);
      }
    });
    app.delete("/api/bb/users/:id", verifyToken, async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await usersCollection.deleteOne(query);
        res.send(result);
      } catch (error) {
        console.log(error);
      }
    });

    // Save or modify user email, status in DB
    // app.put("api/bb/users/:email", async (req, res) => {
    //   const email = req.params.email;
    //   const user = req.body;
    //   const query = { email: email };
    //   const options = { upsert: true };
    //   const isExist = await usersCollection.findOne(query);
    //   if (isExist) return res.send(isExist);
    //   const result = await usersCollection.updateOne(
    //     query,
    //     {
    //       $set: { ...user, timestamp: Date.now() },
    //     },
    //     options
    //   );
    //   res.send(result);
    // });
    app.get("/api/bb/menu", async (req, res) => {
      try {
        const result = await menuCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.log(error);
      }
    });
    app.get("/api/bb/menu/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await menuCollection.findOne(query);
        res.send(result);
      } catch (error) {
        console.log(error);
      }
    });
    app.patch("/api/bb/menu/:id", async (req, res) => {
      try {
        const item = req.body;
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const updatedDoc = {
          $set: {
            name: item.name,
            category: item.category,
            price: item.price,
            recipe: item.recipe,
            image: item.image,
          },
        };
        const result = await menuCollection.updateOne(filter, updatedDoc);
        res.send(result);
      } catch (error) {
        console.log(error);
      }
    });
    app.post("/api/bb/menu", verifyToken, verifyAdmin, async (req, res) => {
      try {
        const data = req.body;
        const result = await menuCollection.insertOne(data);
        res.send(result);
      } catch (error) {
        console.log(error);
      }
    });
    app.delete(
      "/api/bb/menu/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        try {
          const id = req.params.id;
          const query = { _id: new ObjectId(id) };
          const result = await menuCollection.deleteOne(query);
          res.send(result);
        } catch (error) {
          console.log(error);
        }
      }
    );
    app.get("/api/bb/reviews", async (req, res) => {
      try {
        const result = await reviewsCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.log(error);
      }
    });
    app.post("/api/bb/cart", async (req, res) => {
      try {
        const data = req.body;
        const result = await cartCollection.insertOne(data);
        res.send(result);
      } catch (error) {
        console.log(error);
      }
    });
    app.get("/api/bb/cart", async (req, res) => {
      try {
        const query = { email: req.query.email };
        const result = await cartCollection.find(query).toArray();
        res.send(result);
      } catch (error) {
        console.log(error);
      }
    });
    app.delete("/api/bb/cart/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await cartCollection.deleteOne(query);
        res.send(result);
      } catch (error) {
        console.log(error);
      }
    });
    // const calculateOrderAmount = (items) => {
    //   return 1400;
    // };
    app.post("/api/bb/create-payment-intent", async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "aed",
        payment_method_types: ["card"],
        // automatic_payment_methods: {
        //   enabled: true,
        // },
      });
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });
    app.post("/api/bb/payments", async (req, res) => {
      try {
        const paymentDetails = req.body;
        const result = await paymentCollection.insertOne(paymentDetails);
        const query = {
          _id: {
            $in: paymentDetails.cartIds?.map((id) => new ObjectId(id)),
          },
        };
        const deleteResult = await cartCollection.deleteMany(query);
        res.send({ result, deleteResult });
      } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
      }
    });
    app.get("/api/bb/payments/:email", verifyToken, async (req, res) => {
      try {
        // console.log(req.params.email);
        // console.log(req.decoded.email);
        // console.log(req.query);
        const query = { email: req.params.email };
        // console.log(query);
        if (req.params.email !== req.decoded.email) {
          return req.status(403).send({ message: "forbidden access" });
        }
        const result = await paymentCollection.find(query).toArray();
        res.send(result);
      } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
      }
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello from BongoVistra Server..");
});

app.listen(port, () => {
  console.log(`BongoVistra is running on port ${port}`);
});
