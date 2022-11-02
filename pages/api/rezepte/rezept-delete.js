import prisma from "../../prisma/PrismaClient"

export default async function handler(req, res) {
  console.log(req.body)
  if (req.body.call === "delete-recipe") {
    await prisma.rezept
      .delete({
        where: {
          id: req.body.data.recipeId,
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
