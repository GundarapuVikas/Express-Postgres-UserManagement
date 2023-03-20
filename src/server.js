const express = require("express");
const authenticate=require('./data-access/authenticate')
const sequelize=require('./data-access/database');
const userRoutes=require("./routes/routes");
const constants=require("../constants/server.constants");
console.log(constants);
// require('./models/user.model')

const app = express();


app.use(express.json());

app.use('/',userRoutes);

app.use(express.urlencoded({ extended: true }));

sequelize.sync({force:true})
    .then(()=>{
        console.log("Drop and re Synced db.");
    }).catch((err)=>{
        console.log("Failed to sync db: " + err.message);
    })

app.listen(constants.PORT, () => {
    authenticate()
    .then(()=>console.log(`Server is running on port ${constants.PORT}.`))
    .catch((err)=>console.log(err.message))
});