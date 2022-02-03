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

// <url>/employees
// <url>/employees/1
// <url>/customers
app.get('/employees', async(req, res) => {
    const employees = await connectedKnex('employee').select('*')
    res.status(200).json({ employees })
});


app.listen(3000, () => {
    console.log('Server is running on port 3000')
});