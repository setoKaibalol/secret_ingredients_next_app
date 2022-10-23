import { resolve } from "styled-jsx/css"

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

//recipes
export default async function handler(req, res) {
  const recipe = JSON.parse(req.body)
  console.log(recipe)
  let recipeId
  const zutatenIds = []
  const mengeneinheitIds = []

  if (
    recipe.name &&
    recipe.zutaten &&
    recipe.zubereitungszeit &&
    recipe.portionen &&
    recipe.schwierigkeitsgrad &&
    recipe.steps &&
    recipe.recipeType &&
    recipe.image
  ) {
    const updateRecipeTable = () => {
      return new Promise((resolve, reject) => {
        db.query(
          `INSERT INTO recipes (recipeName, zubereitungszeit, portionen, schwierigkeitsgrad, utensilien, quellen, recipeImage, recipeType, likes )
         VALUES ("${recipe.name}","${recipe.zubereitungszeit}","${recipe.portionen}",
         "${recipe.schwierigkeitsgrad}","${recipe.wichtigeUtensilien}","${recipe.quellen}",
         "${recipe.image}","${recipe.recipeType}", 0);`,
          (err, result) => {
            if (err) {
              console.log(err.name, ": ", err.message)
              resolve()
              res.status(400).send(err.name, ": ", err.message)
            } else {
              recipeId = result.insertId
              res.status(200)
              resolve()
            }
          }
        )
      })
    }

    const updateRecipeZutaten = () => {
      return new Promise((resolve, reject) => {
        recipe.zutaten.forEach((zutat, index, array) => {
          db.query(
            `INSERT INTO recipezutaten (recipeId, zutatId, mengeneinheitId, menge, kommentar) 
                Values (${recipeId}, ${zutatenIds[zutat.id]}, ${
              mengeneinheitIds[zutat.id]
            }, ${zutat.menge}, "${zutat.kommentar}");`,
            (err, result) => {
              if (err) {
                res.status(400).send("recipeZutaten Error")
                reject()
              } else {
                resolve()
              }
            }
          )
        })
      })
    }

    const updateStepsTable = () => {
      return new Promise((resolve, reject) => {
        recipe.steps.forEach((step, index) => {
          db.query(
            `INSERT INTO recipeSteps (recipeId, stepText, stepImgUrl)
            VALUES ("${recipeId}", "${step.text}", "${step.imageUrl}");`,
            (err, result) => {
              if (err) {
                console.log(err.name, ": ", err.message)
                res.status(400).send(err.name, ": ", err.message)
                return
              } else {
                if (index + 1 === recipe.steps.length) {
                  console.log("stepTable success")
                  resolve()
                  return
                }
                res.status(200)
              }
            }
          )
        })
      })
    }

    const updateZutatenTable = () => {
      return new Promise((resolve, reject) => {
        recipe.zutaten.forEach((zutat, index) => {
          let zutatName = zutat.zutat
          db.query(
            `INSERT INTO zutaten (zutat) VALUES ("${zutatName}");`,
            (err, result) => {
              if (err) {
                console.log(err.name, ": ", err.message)
                db.query(
                  `SELECT zutatId from zutaten
                  WHERE zutat = "${zutatName}";`,
                  (err, result) => {
                    if (err) {
                    } else {
                      zutatenIds.push(result[0].zutatId)
                      if (index + 1 === recipe.zutaten.length) {
                        console.log("hi")
                        resolve()
                        return
                      }
                    }
                  }
                )
              } else {
                console.log("zutat ", zutatName, "added")
                zutatenIds.push(result.insertId)
                res.status(200)
                if (index + 1 === recipe.zutaten.length) {
                  console.log("hi")
                  resolve()
                  return
                }
              }
            }
          )
        })
      })
    }

    const updateMengeneinheitenTable = () => {
      return new Promise((resolve, reject) => {
        recipe.zutaten.forEach((zutat, index) => {
          db.query(
            `INSERT INTO mengeneinheit (mengeneinheit) VALUES ("${zutat.einheit}");`,
            (err, result) => {
              if (err) {
                db.query(
                  `SELECT mengeneinheitId from mengeneinheit
                      WHERE mengeneinheit = "${zutat.einheit}";`,
                  (err, result) => {
                    if (err) {
                    } else {
                      mengeneinheitIds.push(result[0].mengeneinheitId)
                      if (index + 1 === recipe.zutaten.length) {
                        console.log("mengeneinheitenTable success")
                        resolve()
                        return
                      }
                    }
                  }
                )
              } else {
                console.log("mengeneinheit ", zutat.einheit, "added")
                mengeneinheitIds.push(result.insertId)
                if (index + 1 === recipe.zutaten.length) {
                  console.log("mengeneinheitenTable success")
                  resolve()
                  return
                }
              }
            }
          )
        })
      })
    }

    await updateRecipeTable()
      .then(async () => {
        await updateStepsTable()
        await updateMengeneinheitenTable()
        await updateZutatenTable()
      })
      .then(async () => {
        await updateRecipeZutaten()
      })
      .then(() => {
        console.log("huhu?")
        res.status(200).send("success")
      })
  } else {
    res.status(400).send("input missing")
  }
}
