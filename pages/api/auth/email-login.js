require("dotenv").config()
const mysql = require("mysql2")
import bcrypt from "bcrypt"
const { createCipheriv } = require("crypto")

const key = process.env.KEY
const iv = process.env.IV

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
  if (req.method === "POST") {
    const email = req.body.credentials.email
    const password = req.body.credentials.password
    console.log(email, password)
    const cipher = createCipheriv("aes256", key, iv)
    const encryptedEmail =
      cipher.update(email, "utf8", "hex") + cipher.final("hex")
    let hashedPW
    let exists = false
    let userId

    const getPW = new Promise((resolve, reject) => {
      db.getConnection((err, connection) => {
        db.query(
          `select pswd from users
				where email = '${encryptedEmail}';`,
          (error, result) => {
            connection.release()
            if (error) {
              console.log(error)
              res.status(500)
              res.send("Login failed.")
            } else {
              hashedPW = result[0]?.pswd
              resolve()
            }
          }
        )
      })
    })

    const checkEmail = new Promise((resolve, reject) => {
      db.getConnection((err, connection) => {
        db.query(
          `select email, id from users
			where email = '${encryptedEmail}';`,
          (error, result) => {
            connection.release()
            if (error) {
              console.log(error)
              res.status(500)
              res.send("Login failed.")
            } else {
              if (result.length < 1) {
                exists = false
                resolve()
              } else {
                exists = true
                userId = result[0].id
                resolve()
              }
            }
          }
        )
      })
    })

    await checkEmail.then(async () => {
      if (exists === false) {
        res.status(400)
        res.send("Email doesn't exist.")
      } else
        await getPW.then(async () => {
          if (
            //right password
            await bcrypt.compare(password, hashedPW)
          ) {
            res.status(200)
            res.json({ id: userId, name: email, email: email })
          } else {
            //wrong password
            res.status(403)
            res.send("Wrong Password")
          }
        })
    })
  }
}

// login user session

/* router.get("/session", authenticateToken, async (req, res) => {
	res.status(200).send("logged in")
})
router.get("/session/refresh", async (req, res) => {
	const refreshToken = req.cookies["refresh_token"]
	if (refreshToken == null) return res.sendStatus(401)
	else
		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
			if (err) return res.sendStatus(403)
			else {
				const accessToken = jwt.sign(
					{ name: user.user },
					process.env.ACCESS_TOKEN_SECRET,
					{
						expiresIn: "15s",
					}
				)
				res
					.status(203)
					.cookie("access_token", accessToken, {
						secure: true,
						httpOnly: true,
						sameSite: "none",
					})
					.send("new access_token created")
			}
		})
})
*/
