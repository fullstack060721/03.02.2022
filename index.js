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

app.get('/employees/:emp_id', async(req, res) => {
    const employee = await connectedKnex('employee').select('*').
                            where('id', req.params.emp_id)
    res.status(200).json({ employee })
});

app.post('/employees', async(req, res) => {
    try {
    emp = req.body // { name: '', age: '', address: '', salary: '' }
    const result = await connectedKnex('employee').insert(emp)
        .returning('id');
    console.log(emp)
    res.status(201).json({ 
        res: 'success',
        url: `localhost:3000/employees/${emp.ID}`
    })
    } 
    catch(err) {
        res.status(400).json({
            res: 'fail',
            message: err.message
    })}
});


app.put('/employees/:emp_id', async(req, res) => {
    try {
    emp_id = req.params.emp_id
    emp = req.body // { name: '', age: '', address: '', salary: '' }
    const result = await connectedKnex('employee').where('id', emp_id).
                            update(emp);
    res.status(204).json({ 
        res: 'success',
        url: `localhost:3000/employees/${emp_id}`
    })
    } 
    catch(err) {
        res.status(400).json({
            res: 'fail',
            message: err.message
    })}
});

app.listen(3000, () => {
    console.log('Server is running on port 3000')
});