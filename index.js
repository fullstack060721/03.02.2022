const express = require('express')
const sqlite3 = require('sqlite3')
const pg = require('pg')
const path = require('path')
const knex = require('knex')

const app = express()
/*
const connectedKnex = knex({
    client: "sqlite3",
    connection: {
        filename: "employee.db"
    }
})
*/
const connectedKnex = knex({
    client: "pg",
    versio: '12',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'admin',
        database: 'test1'
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
        url: `localhost:3000/employees/${result[0]}`
    })
    } 
    catch(err) {
        res.status(400).json({
            res: 'fail',
            message: err.message
    })}
});

// .update --> .del()
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

app.delete('/employees/:emp_id', async(req, res) => {
    try {
    emp_id = req.params.emp_id
    const result = await connectedKnex('employee').where('id', emp_id).
                            del();
    res.status(204).json({ 
        res: 'success'
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