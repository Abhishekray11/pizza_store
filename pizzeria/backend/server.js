require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.js');
const dashboardRoutes = require("./routes/dashboard");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

// Initialize DB Connection
connectDB();

// Global Middlewares
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Pizzeria Core API');
});

// Application Routing Matrix
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/menu', require('./routes/menu.js'));
app.use('/api/orders', require('./routes/order.js'));
app.use('/api/bills', require('./routes/bill'));
app.use('/api/dashboard',require( './routes/dashboard' ));
app.use("/api/admin", require("./routes/dashboard"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/ai", aiRoutes);
app.use("/api/notifications",require("./routes/notification"));

const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Pizzeria Core Server operating on port ${PORT}`));
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () =>
    console.log(`Pizzeria Core Server operating on port ${PORT}`)
  );
}
module.exports = app; // Export app for testing purposes
