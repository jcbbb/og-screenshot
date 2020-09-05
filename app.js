const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000;

app.use('/screenshot', require('./api/screenshot'));

app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`);
});
