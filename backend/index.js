const express = require("express");
const cors =require("cors");

const PORT=3000;
const app= express();

app.use(cors());
app.use(express.json());

const mainRouter = require("./routes/index");

app.use("/api/v1",mainRouter)

app.listen(PORT,()=>{
    console.log(`backend app running on ${PORT}`);
});