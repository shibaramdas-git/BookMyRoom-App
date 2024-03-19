const express = require('express');
const app = express();
const cors = require('cors');

const port = process.env.port || 5000;
app.listen(port, () => console.log('Server started on port 5000'));
//lets connect DB , nothing else.
const dbConfig = require('./database');

const roomsRoute = require('./routes/roomsRoute');
const usersRoute = require('./routes/usersRoute');
const bookingsRoute = require('./routes/bookingsRoute');


app.use(cors());
app.use(express.json());
app.use('/api/rooms', roomsRoute);
app.use('/api/users', usersRoute);
app.use('/api/bookings', bookingsRoute);
