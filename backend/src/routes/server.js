const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const foodRoutes = require('./routes/food');

const app = express();
app.use(cors());
app.use(express.json());

// Mongo connection
mongoose.connect('mongodb://127.0.0.1:27017/grainchain', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Mongo connected"))
  .catch(err => console.error(err));

// Routes
app.use('/food', foodRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
