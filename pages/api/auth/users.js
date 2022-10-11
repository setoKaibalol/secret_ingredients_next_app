const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const encrypt = require("../../../helpers/encrypt")
const mysql = require("mysql2")

const mysqlPasswordProduction =
  process.env.NEXT_PUBLIC_MYSQL_PASSWORD_PRODUCTION
const mysqlUsernameProduction =
  process.env.NEXT_PUBLIC_MYSQL_USERNAME_PRODUCTION

const db = mysql.createPool({
  port: "3306",
  host: "eu-cdbr-west-03.cleardb.net",
  user: mysqlUsernameProduction,
  password: mysqlPasswordProduction,
  database: "heroku_627d1cf77eefb59",
})

export default async function handler(req, res) {
  console.log("loool", req.body)
  const hashedPassword = await bcrypt.hash(req.body.userData.password, 10)
  const encryptedEmail = encrypt(req.body.userData.email)

  let exists = false
  const checkEmail = new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      db.query(
        `select email from users
		where email = '${encryptedEmail}';`,
        (error, result) => {
          connection.release()
          if (error) {
            console.log(error)
            res.status(500)
            res.send("Account Creation failed.")
          } else {
            console.log("result", result)
            if (result.length < 1) {
              exists = false
              resolve()
            } else {
              exists = true
              resolve()
            }
          }
        }
      )
    })
  })

  await checkEmail.then(() => {
    if (exists) {
      res.status(400)
      res.send("Es existiert bereits ein Konto mit dieser Email.")
    } else {
      db.getConnection((err, connection) => {
        db.query(
          `INSERT INTO users (email, pswd) 
            VALUES ("${encryptedEmail}", "${hashedPassword}");`,
          (error, result) => {
            if (error) {
              console.log(error)
              res.status(500)
              res.send("Account Creation failed.")
            } else {
              res.status(200)
              res.send("Account Creation successful.")
            }
          }
        )
      })
    }
  })
}
