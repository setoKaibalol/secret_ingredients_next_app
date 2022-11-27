import prisma from "../../../prisma/PrismaClient"

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (req.body.call === "kategorien-get") {
      const kategorien = await prisma.kategorien.findMany({}).catch((err) => {
        console.log(err)
        res.status(400).send("failed")
      })
      res.status(200).send(kategorien)
    }
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}
