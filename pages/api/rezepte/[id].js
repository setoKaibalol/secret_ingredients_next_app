import prisma from "../../../prisma/PrismaClient"

export default async function handler(req, res) {
  const { id } = req.query

  await prisma.rezept
    .findMany({
      where: {
        id: parseInt(id),
      },
    })
    .then((result) => {
      res.status(200).send(result)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send("failed")
    })
}
