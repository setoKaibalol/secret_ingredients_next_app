const mysql = require("mysql2")

const mysqlPasswordProduction = process.env.MYSQL_PASSWORD_PRODUCTION
const mysqlUsernameProduction = process.env.MYSQL_USERNAME_PRODUCTION

/* const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: mysqlPassword,
  database: "si",
}) */

const db = mysql.createPool({
  port: "3306",
  host: "eu-cdbr-west-03.cleardb.net",
  user: mysqlUsernameProduction,
  password: mysqlPasswordProduction,
  database: "heroku_627d1cf77eefb59",
})

export default async function handler(req, res) {
  console.log(req.body)
  const queryData = req.body
  let responseData
  if (queryData.column && queryData.index) {
    const queryRecipes = new Promise((resolve, reject) => {
      db.getConnection((err, connection) => {
        db.query(
          `SELECT * FROM recipes WHERE ${queryData.column} = "${queryData.index}";`,
          (error, result) => {
            connection.release()
            if (error) {
              res.status(400)
              res.send("error")
              resolve()
            } else {
              responseData = result
              resolve()
            }
          }
        )
      })
    })

    await queryRecipes.then(() => res.status(200).send(responseData))
  } else {
    res.status(400)
    res.send("Input error")
  }
}
