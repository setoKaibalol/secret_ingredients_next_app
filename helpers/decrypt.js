const { createDecipheriv } = require("crypto")

const key = process.env.KEY
const iv = process.env.IV

const decrypt = (input) => {
  const cipher = createDecipheriv("aes256", key, iv)
  let decrypted = cipher.update(input, "hex", "utf-8") + cipher.final("utf8")
  return decrypted
}

module.exports = decrypt
