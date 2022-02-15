const express    = require('express');
const bodyparser = require('body-parser');
const cors       = require('cors'); 

const app = express();

app.use(cors());
app.use(bodyparser.json());


// Routing
const mainRouter = require('./routes/main')


// Routing
app.use('/user', mainRouter)



app.listen(3000, () => {
    console.log('Servidoer corriendo en puerto : http://localhost:3000');
});