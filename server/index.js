const path = require('path');
const express = require('express');
const morgan = require('morgan');

let app = express();
module.exports = app; // this line is only used to make testing easier.

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '..', 'docs')));

app.get('*', function (req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'docs/index.html'));
});

app.use((err, req, res, next) => {
	console.error(err);
	console.error(err.stack);
	res.status(err.status || 500).send(err.message || 'Internal server error.');
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}!`);
});
