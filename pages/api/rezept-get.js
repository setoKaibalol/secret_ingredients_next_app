const mysql = require("mysql2")

const mysqlPasswordProduction = process.env.MYSQL_PASSWORD
const mysqlUsernameProduction = process.env.MYSQL_USERNAME

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
  connectionLimit: 100,
})

export default async function handler(req, res) {
  const queryData = JSON.parse(req.body)
  let responseData
  if (queryData.column && queryData.index) {
    const queryRecipes = () => {
      return new Promise((resolve, reject) => {
        db.query(
          `SELECT * FROM recipes WHERE ${queryData.column} = "${queryData.index}";`,
          (error, result) => {
            if (error) {
              res.status(400).send("error")
              resolve()
            } else {
              responseData = result
              resolve()
            }
          }
        )
      })
    }

    await queryRecipes().then(() => {
      res.status(200).json(responseData)
    })
  } else {
    res.status(400).send("Input error")
  }
}
