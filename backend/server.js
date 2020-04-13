const express = require('express');
const router = require('./routes/routes');

const app = express();

const port = process.env.PORT || 8080;

app.use('/', router);
 
app.listen(port, () => console.log(`REST API is listening on port ${port}`));
 
