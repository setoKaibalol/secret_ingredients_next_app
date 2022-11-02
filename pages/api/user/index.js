import prisma from "../../../prisma/PrismaClient"

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (req.body?.call === "get-user") {
      await prisma.user
        .findUnique({
          where: {
            email: req.body.data.email,
          },
        })
        .then((result) => {
          res.status(200).send(result)
        })
        .catch((err) => {
          console.log(err)
          res.status(400).send("failed")
        })
    } else if (req.body?.call === "get-user-by-recipeId") {
      await prisma.user
        .findFirst({
          where: {
            id: req.body.data.userId,
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
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}
