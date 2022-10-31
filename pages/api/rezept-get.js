import prisma from "../../prisma/PrismaClient"

export default async function handler(req, res) {
  if (req.body.call === "list-grundrezepte") {
    await prisma.rezept
      .findMany({
        where: {
          typ: "grundrezept",
        },
      })
      .then((result) => {
        res.status(200).send(result)
      })
      .catch((err) => {
        console.log(err)
        res.status(400).send("failed")
      })
  }
  if (req.body.call === "list-geheimrezepte") {
    await prisma.rezept
      .findMany({
        where: {
          typ: "geheimrezept",
        },
      })
      .then((result) => {
        res.status(200).send(result)
      })
      .catch((err) => {
        console.log(err)
        res.status(400).send("failed")
      })
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}
