
const knex = require("knex");
const sqlite3 = require("sqlite3").verbose();

const connectedKnex = knex({
    client: "sqlite3",
    connection: {
        filename: "employee.db"
    }
})

const result = connectedKnex.select().from("employee")
result.then(rows => {
    console.log(rows);
})
