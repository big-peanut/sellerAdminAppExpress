const express=require('express')
const adminRoutes=require('./routes/adminRoutes')
const sequelize = require('./util/database')
const bodyParser = require('body-parser')
const cors=require('cors')

const app=express()

app.use(cors())

app.use(bodyParser.json())

app.use(adminRoutes)

sequelize.sync()
    .then((res) => {
        app.listen(3000)
    })
    .catch((err) => {
        console.log(err)
    })


