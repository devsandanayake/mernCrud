const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
 
//import routes
const postRoutes = require('./routes/posts');
 

//app middelware
app.use(bodyParser.json());
app.use(cors());

 


//routes middelware
app.use(postRoutes);
 
 
const PORT = 8000;

 
const DB_URL ='mongodb+srv://dev:dev123@mernapp.zwstxds.mongodb.net/mernCrud?retryWrites=true&w=majority'
mongoose.set('strictQuery', false);
mongoose.set('strictQuery', true);

 


mongoose.connect(DB_URL)
.then(()=>{
    console.log('DB Connected');
})
.catch((err)=> console.log('DB connection error',err));

app.listen(PORT,()=>{
    console.log(`App is running on ${PORT}`);
});


