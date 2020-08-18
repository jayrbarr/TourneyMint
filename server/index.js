const express = require('express');

const app = express();

app.use(express.static(`${__dirname}/../dist`));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running at: ${PORT}`);
});
