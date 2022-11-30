import prisma from "../../../prisma/PrismaClient"

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (req.body.call === "inc-aufrufe") {
      const rezept = await prisma.rezept
        .update({
          where: {
            id: req.body.data.recipeId,
          },
          data: {
            aufrufe: {
              increment: 1,
            },
          },
        })
        .catch((err) => {
          console.log(err)
          res.status(500).send("failed")
        })
      res.status(200).send(rezept)
    }
    if (req.body.call === "post-comment") {
      const rezept = await prisma.rezept
        .update({
          where: {
            id: req.body.data.recipeId,
          },
          data: {
            kommentare: {
              create: {
                text: req.body.data.comment,
                author: {
                  connect: {
                    id: req.body.data.userId,
                  },
                },
              },
            },
          },
        })
        .catch((err) => {
          console.log(err)
        })
      res.status(200).send(rezept)
    }
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}
