const express = require('express')
const app = express()
const connectDB = require("../config/db")
const userRouter = require("../routes/index");
const port = 3000

app.use(express.json());
app.use("/api/v1", userRouter); //middileware


connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});