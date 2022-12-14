const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require("../backend/config/database");

dotenv.config({ path : 'backend/config/config.env' });

//Connecting to db
connectDB();

app.listen(process.env.PORT, () =>{
    console.log(`server started on port : ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})