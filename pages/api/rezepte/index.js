import prisma from "../../../prisma/PrismaClient"

export default async function handler(req, res) {
  await prisma.rezept
    .findMany({})
    .then((result) => {
      res.status(200).send(result)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send("failed")
    })
}
