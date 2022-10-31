import prisma from "../../prisma/PrismaClient"

export default async function handler(req, res) {
  console.log(req.body)
  if (req.body.call === "rezept-upload") {
    const recipe = {
      userId: req.body.data.userId,
      name: req.body.data.name,
      zubereitungszeit: req.body.data.zubereitungszeit,
      portionen: req.body.data.portionen,
      schwierigkeitsgrad: req.body.data.schwierigkeitsgrad,
      utensilien: req.body.data.utensilien,
      quellen: req.body.data.quellen,
      image: req.body.data.image,
      typ: req.body.data.typ,
    }

    await prisma.rezept
      .create({
        data: recipe,
      })
      .then((result) => {
        res.status(200).send(result)
      })
      .catch((err) => {
        console.log(err)
        res.status(400).send("failed")
      })
  }
  if (req.body.call === "zutaten-upload") {
    console.log(req.body.data)

    await prisma.rezeptZutat
      .createMany({
        data: req.body.data,
      })
      .then((result) => {
        res.status(200).send(result)
      })
      .catch((err) => {
        console.log(err)
        res.status(400).send("failed")
      })
  }
  if (req.body.call === "steps-upload") {
    console.log(req.body.data)

    await prisma.rezeptStep
      .createMany({
        data: req.body.data,
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
