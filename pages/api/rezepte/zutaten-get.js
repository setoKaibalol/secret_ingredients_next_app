import prisma from "../../../prisma/PrismaClient"

export default async function handler(req, res) {
  if (req.body.call === "get-rezept-zutaten") {
    await prisma.rezeptZutat
      .findMany({
        where: {
          recipeId: req.body.data.recipeId,
        },
      })
      .then((result) => {
        res.status(200).send(result)
      })
      .catch((err) => {
        console.log(err)
        res.status(500).send("failed")
      })
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}
