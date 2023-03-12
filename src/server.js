const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db=require('./models');
const userRoutes=require("./routes/routes");
// db.sequelize.sync({force:true})
db.sequelize.sync()
    .then(()=>{
        console.log("Drop and re Synced db.");
    }).catch((err)=>{
        console.log("Failed to sync db: " + err.message);
    })

app.use('/',userRoutes);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});