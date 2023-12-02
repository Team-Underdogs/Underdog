require("dotenv").config();
const cors = require('cors');
const express = require("express");
const mongoose = require("mongoose");
const { auth } = require('express-openid-connect');
const multer = require('multer');

// Enviroment variables
const PORT = process.env.PORT;
const MONGO_STRING = process.env.MONGO_STRING;
const AUTH0_SECRET = process.env.AUTH0_SECRET;

// Connect to database
mongoose.connect(MONGO_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const database = mongoose.connection;

database.on("error", (error) => {
    console.log("Error connecting to database: ", error);
});

database.once("connected", () => {
    console.log("Connected to database");
});

// Auth0 config
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: AUTH0_SECRET,
    baseURL: `http://localhost:${PORT}`,
    clientID: 'ygohHzPuXtkMMcMiUq5GEA6Be9s78d5G',
    issuerBaseURL: 'https://underdogs.au.auth0.com'
  };

// Auth Middleware
const authMiddleware = (req, res, next) => {
    const UserId = req.query.UserId;
    if (!UserId) {
        return res.status(401).json({ message: "Unauthorized, user id not provided" });
    } else {
        next();
    }
};

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, '../client/viteapp/src/assets/uploads/')
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
});

const upload = multer({ storage: storage });

module.exports = {
    authMiddleware,
    upload,
};

// Create express app
const app = express();

// Parse json and handle CORS
app.use(express.json());
app.use(cors());

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// Routes
const storesRouter = require("./routes/storeRoutes");
app.use("/stores", storesRouter);

const productsRouter = require("./routes/productRoutes");
app.use("/products", productsRouter);

const servicesRouter = require("./routes/servicesRoutes");
app.use("/services", servicesRouter);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});