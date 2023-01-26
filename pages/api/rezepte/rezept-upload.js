import prisma from "../../../prisma/PrismaClient"

export default async function handler(req, res) {
  if (req.body.call === "rezept-upload") {
    const handleKategorien = (kategorien) => {
      const array = []
      kategorien.forEach((kategorie) => {
        array.push({ name: kategorie.value })
      })
      return array
    }

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
          kategorien: {
            connect: handleKategorien(req.body.data.kategorien),
          },
          name: req.body.data.name,
          zubereitungszeit: req.body.data.zubereitungszeit,
          portionen: req.body.data.portionen,
          schwierigkeitsgrad: req.body.data.schwierigkeitsgrad,
          utensilien: req.body.data.utensilien,
          youtube: req.body.data.youtube,
          instagram: req.body.data.instagram,
          chefkoch: req.body.data.chefkoch,
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
