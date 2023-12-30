const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));


app.use(express.static(path.join(__dirname, 'public')));


const bmiRouter = require('./routes/bmi');
app.use('/', bmiRouter);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
