const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { getData2 } = require("./backend/db/db");

// const allRoutes = require("./backend/routers/all_routes/allRoutes");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Mounting the Proc routes under /proc
// app.use("/allRoutes", allRoutes);

// Mounting the Rotc routes under /rotc
// app.use("/rotc", rotcRoutes);

const port = process.env.PORT || 3060;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);

    getData2('SELECT * FROM DETAILS')
});

module.exports = app;