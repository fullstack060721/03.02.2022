const express = require('express')
const sqlite3 = require('sqlite3')
const path = require('path')
const knex = require('knex')

const app = express()

const connectedKnex = knex({
    client: "sqlite3",
    connection: {
        filename: "employee.db"
    }
})

app.use(express.static(path.join(__dirname, '/')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(3000, () => {
    console.log('Server is running on port 3000')
});