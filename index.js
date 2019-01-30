const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/posts');

app.use('/api/posts', posts);

// Handle Production
if(process.env.NODE_ENV === 'production'){
    //Static folder
    app.use(express.static(__dirname + '/public/'));

    //Handle SPA
    app.get(/.*/, (req,res)=> res.sendfile(__dirname + '/public/index.html'));
}

app.use(morgan('common', {immediate: true}));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
