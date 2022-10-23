const mysql = require("mysql2")

const mysqlPasswordProduction = process.env.MYSQL_PASSWORD
const mysqlUsernameProduction = process.env.MYSQL_USERNAME

const db = mysql.createPool({
  port: "3306",
  host: "eu-cdbr-west-03.cleardb.net",
  user: mysqlUsernameProduction,
  password: mysqlPasswordProduction,
  database: "heroku_627d1cf77eefb59",
  connectionLimit: 100,
})

export default async function handler(req, res) {
  const recipeId = JSON.parse(req.body)
  if (recipeId) {
    const deleteRecipeSteps = () => {
      return new Promise((resolve, reject) => {
        db.query(
          `DELETE FROM recipesteps WHERE recipeId = ${recipeId};`,
          (error, result) => {
            if (error) {
              res.status(400).send("error")
              resolve()
            } else {
              resolve()
            }
          }
        )
      })
    }
    const deleteRecipeZutaten = () => {
      return new Promise((resolve, reject) => {
        db.query(
          `DELETE FROM recipezutaten WHERE recipeId = ${recipeId}`,
          (error, result) => {
            if (error) {
              res.status(400).send("error")
              resolve()
            } else {
              resolve()
            }
          }
        )
      })
    }
    const deleteRecipes = () => {
      return new Promise((resolve, reject) => {
        db.query(
          `DELETE FROM recipes WHERE recipeId = ${recipeId};
            `,
          (error, result) => {
            if (error) {
              res.status(400).send("error")
              resolve()
            } else {
              resolve()
            }
          }
        )
      })
    }
    Promise.all([deleteRecipeSteps(), deleteRecipeZutaten()]).then(() => {
      deleteRecipes().then(() => {
        res.status(200).send()
      })
    })
  } else {
    res.status(400).send("Input error")
  }
}
