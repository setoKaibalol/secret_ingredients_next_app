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

//recipes
export default async function handler(req, res) {
  console.log(req.body)
  const recipe = req.body
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
    const updateRecipeTable = new Promise((resolve, reject) => {
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

    const updateStepsTable = new Promise((resolve, reject) => {
      let index = 0
      updateRecipeTable.then(() => {
        recipe.steps.forEach((step) => {
          db.query(
            `INSERT INTO recipeSteps (recipeId, stepText, stepImgUrl)
            VALUES ("${recipeId}", "${step.text}", "${step.imageUrl}");`,
            (err, result) => {
              if (err) {
                console.log(err.name, ": ", err.message)
                res.status(400).send(err.name, ": ", err.message)
              } else {
                index += 1
                if (index === recipe.steps.length * 2) resolve()
                res.status(200)
              }
            }
          )
        })
      })
    })

    const updateChildTables = new Promise((resolve, reject) => {
      let index = 0

      recipe.zutaten.forEach((zutat) => {
        let zutatName = zutat.zutat
        db.query(
          `INSERT INTO zutaten (zutat) VALUES ("${zutatName}");`,
          (err, result) => {
            if (err) {
              console.log(err.name, ": ", err.message)
              console.log("Getting zutatId...")
              db.query(
                `SELECT zutatId from zutaten
                  WHERE zutat = "${zutatName}";`,
                (err, result) => {
                  if (err) {
                    console.log("Couldnt get zutatId for", zutatName)
                  } else {
                    zutatenIds.push(result[0].zutatId)
                    index += 1
                    if (index === recipe.zutaten.length * 2) resolve()
                    console.log("added zutatId for", zutatName)
                  }
                }
              )
            } else {
              console.log("zutat ", zutatName, "added")
              zutatenIds.push(result.insertId)
              index += 1
              if (index === recipe.zutaten.length * 2) resolve()
              res.status(200)
            }
          }
        )

        db.query(
          `INSERT INTO mengeneinheit (mengeneinheit) VALUES ("${zutat.einheit}");`,
          (err, result) => {
            if (err) {
              console.log(err.name, ": ", err.message)
              console.log("Getting mengeneinheitId...")
              db.query(
                `SELECT mengeneinheitId from mengeneinheit
                      WHERE mengeneinheit = "${zutat.einheit}";`,
                (err, result) => {
                  if (err) {
                    console.log(
                      "Couldnt get mengeneinheitId for",
                      zutat.einheit
                    )
                  } else {
                    mengeneinheitIds.push(result[0].mengeneinheitId)
                    index += 1
                    if (index === recipe.zutaten.length * 2) resolve()
                    console.log("added mengeneinheitId for", zutat.einheit)
                  }
                }
              )
            } else {
              console.log("mengeneinheit ", zutat.einheit, "added")
              mengeneinheitIds.push(result.insertId)
              index += 1
              if (index === recipe.zutaten.length * 2) resolve()
              res.status(200)
            }
          }
        )
      })
    })

    Promise.all([updateRecipeTable, updateChildTables]).then(() => {
      recipe.zutaten.forEach((zutat, index, array) => {
        console.log(
          "zutatenIds:",
          zutatenIds,
          "mengeneinheitIds:",
          mengeneinheitIds
        )
        db.query(
          `INSERT INTO recipezutaten (recipeId, zutatId, mengeneinheitId, menge, kommentar) 
              Values (${recipeId}, ${zutatenIds[zutat.id]}, ${
            mengeneinheitIds[zutat.id]
          }, ${zutat.menge}, "${zutat.kommentar}");`,
          (err, result) => {
            if (err) {
              console.log(err)
            } else {
              console.log(result)
            }
          }
        )
      })
    })

    Promise.all([updateRecipeTable, updateChildTables, updateStepsTable]).then(
      () => {
        res.send("success")
      }
    )
  } else {
    res.status(400).send("input missing")
  }
}
