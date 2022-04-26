const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const memberRoutes = require('./routes/memberRoutes');

const port = process.env.PORT || 5000;
const app = express();

dotenv.config();

mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let db = mongoose.connection;
db.on('error', () => console.error.bind(console, 'Error connecting to Database'));
db.once('open', () => console.log('MongoDB connection is now established'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded( { extended: true } ));

app.use('/members', memberRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}`));