const { createCipheriv } = require("crypto")

const key = process.env.KEY
const iv = process.env.IV

function encrypt(input) {
  const cipher = createCipheriv("aes256", key, iv)
  let encrypted = cipher.update(input, "utf8", "hex") + cipher.final("hex")
  return encrypted
}

module.exports = encrypt
