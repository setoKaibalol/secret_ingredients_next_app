import prisma from "../../../prisma/PrismaClient"

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (req.body.call === "list-grundrezepte") {
      await prisma.rezept
        .findMany({
          where: {
            typ: "grundrezept",
          },
        })
        .catch((err) => {
          console.log(err)
          res.status(500).send("failed")
        })
      res.status(200).send(result)
    }
    if (req.body.call === "list-geheimrezepte") {
      await prisma.rezept
        .findMany({
          where: {
            typ: "geheimrezept",
          },
        })
        .catch((err) => {
          console.log(err)
          res.status(500).send("failed")
        })
      res.status(200).send(result)
    }
    if (req.body.call === "list-rezepte") {
      await prisma.rezept.findMany({}).catch((err) => {
        console.log(err)
        res.status(500).send("failed")
      })
      res.status(200).send(result)
    }
    if (req.body?.call === "get-rezept") {
      await prisma.rezept
        .findFirst({
          where: {
            id: req.body.data.id,
          },
        })
        .catch((err) => {
          console.log(err)
          res.status(500).send("failed")
        })
      res.status(200).send(result)
    }
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}
