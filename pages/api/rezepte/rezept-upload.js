import prisma from "../../../prisma/PrismaClient"

export default async function handler(req, res) {
  if (req.body.call === "rezept-upload") {
    console.log(req.body.data.kategorie)
    await prisma.rezept
      .create({
        data: {
          author: {
            connect: {
              id: req.body.data.userId,
            },
          },
          zutaten: {
            createMany: {
              data: req.body.data.zutaten,
            },
          },
          steps: {
            createMany: {
              data: req.body.data.steps,
            },
          },
          kategorie: {
            connect: {
              name: req.body.data.kategorie,
            },
          },
          name: req.body.data.name,
          zubereitungszeit: req.body.data.zubereitungszeit,
          portionen: req.body.data.portionen,
          schwierigkeitsgrad: req.body.data.schwierigkeitsgrad,
          utensilien: req.body.data.utensilien,
          quellen: req.body.data.quellen,
          image: req.body.data.image,
          typ: req.body.data.typ,
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
