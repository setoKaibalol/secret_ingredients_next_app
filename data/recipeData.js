const recipeData = [
  {
    id: "1",
    name: "Chicken Breast",
    Category: "Chicken",
    Tags: ["Fleisch", "Chicken", "Hot"],
    image:
      "https://image.brigitte.de/11499166/t/89/v3/w1440/r1.5/-/gegrille-haehnchenbrust.jpg",
    description: `Bratkartoffeln
      Für diese schnellen Bratkartoffeln haben wir Pellkartoffeln vom Vortag verwendet, diese mit Zwiebeln und Knoblauch gebraten und mit Kümmel, Thymian, Paprika sowie Salz und Pfeffer abgeschmeckt. Ganz einfach zubereitet und sehr lecker.
      `,
    date: new Date().toDateString(),
  },
  {
    id: "2",
    name: "Hähnchen lugatch",
    Category: "Chicken",
    Tags: ["Fleisch", "Chicken", "Hot"],
    image:
      "https://www.budgetbytes.com/wp-content/uploads/2021/12/Chicken-Breast-Pan.jpg",
    description: `Bratkartoffeln
      Für diese schnellen Bratkartoffeln haben wir Pellkartoffeln vom Vortag verwendet, diese mit Zwiebeln und Knoblauch gebraten und mit Kümmel, Thymian, Paprika sowie Salz und Pfeffer abgeschmeckt. Ganz einfach zubereitet und sehr lecker.
      `,
    date: new Date().toDateString(),
  },
  {
    id: "3",
    name: "Karotten creme",
    Category: "Vegetarisch",
    Tags: ["Vegetarisch", "Karotten"],
    image:
      "https://www.foodtempel.de/wp-content/uploads/Einfache-Karottencremesuppe.jpg",
    description: `Bratkartoffeln
      Für diese schnellen Bratkartoffeln haben wir Pellkartoffeln vom Vortag verwendet, diese mit Zwiebeln und Knoblauch gebraten und mit Kümmel, Thymian, Paprika sowie Salz und Pfeffer abgeschmeckt. Ganz einfach zubereitet und sehr lecker.
      https://www.zentrum-der-gesundheit.de/rezepte/hauptgerichte/kartoffel-rezepte/bratkartoffeln`,
    date: new Date().toDateString(),
  },
  {
    id: "4",
    name: "Trüffel frapucino",
    Category: "Pilze",
    Tags: ["Pilze", "Getränke", "Vegetarisch"],
    image:
      "https://image.essen-und-trinken.de/11953132/t/SR/v10/w1440/r1.5/-/chefkoch-bananen-frapuccino-jpg--65498-.jpg",
    description: `Bratkartoffeln
      Für diese schnellen Bratkartoffeln haben wir Pellkartoffeln vom Vortag verwendet, diese mit Zwiebeln und Knoblauch gebraten und mit Kümmel, Thymian, Paprika sowie Salz und Pfeffer abgeschmeckt. Ganz einfach zubereitet und sehr lecker.
      https://www.zentrum-der-gesundheit.de/rezepte/hauptgerichte/kartoffel-rezepte/bratkartoffeln`,
    date: new Date().toDateString(),
  },
  {
    id: "4",
    name: "Trüffel frapucino",
    Category: "Pilze",
    Tags: ["Pilze", "Getränke", "Vegetarisch"],
    image:
      "https://image.essen-und-trinken.de/11953132/t/SR/v10/w1440/r1.5/-/chefkoch-bananen-frapuccino-jpg--65498-.jpg",
    description: `Bratkartoffeln
      Für diese schnellen Bratkartoffeln haben wir Pellkartoffeln vom Vortag verwendet, diese mit Zwiebeln und Knoblauch gebraten und mit Kümmel, Thymian, Paprika sowie Salz und Pfeffer abgeschmeckt. Ganz einfach zubereitet und sehr lecker.
      https://www.zentrum-der-gesundheit.de/rezepte/hauptgerichte/kartoffel-rezepte/bratkartoffeln`,
    date: new Date().toDateString(),
  },
  {
    id: "4",
    name: "Trüffel frapucino",
    Category: "Pilze",
    Tags: ["Pilze", "Getränke", "Vegetarisch"],
    image:
      "https://image.essen-und-trinken.de/11953132/t/SR/v10/w1440/r1.5/-/chefkoch-bananen-frapuccino-jpg--65498-.jpg",
    description: `Bratkartoffeln
      Für diese schnellen Bratkartoffeln haben wir Pellkartoffeln vom Vortag verwendet, diese mit Zwiebeln und Knoblauch gebraten und mit Kümmel, Thymian, Paprika sowie Salz und Pfeffer abgeschmeckt. Ganz einfach zubereitet und sehr lecker.
      https://www.zentrum-der-gesundheit.de/rezepte/hauptgerichte/kartoffel-rezepte/bratkartoffeln`,
    date: new Date().toDateString(),
  },
  {
    id: "4",
    name: "Trüffel frapucino",
    Category: "Pilze",
    Tags: ["Pilze", "Getränke", "Vegetarisch"],
    image:
      "https://image.essen-und-trinken.de/11953132/t/SR/v10/w1440/r1.5/-/chefkoch-bananen-frapuccino-jpg--65498-.jpg",
    description: `Bratkartoffeln
      Für diese schnellen Bratkartoffeln haben wir Pellkartoffeln vom Vortag verwendet, diese mit Zwiebeln und Knoblauch gebraten und mit Kümmel, Thymian, Paprika sowie Salz und Pfeffer abgeschmeckt. Ganz einfach zubereitet und sehr lecker.
      https://www.zentrum-der-gesundheit.de/rezepte/hauptgerichte/kartoffel-rezepte/bratkartoffeln`,
    date: new Date().toDateString(),
  },
  {
    id: "4",
    name: "Trüffel frapucino",
    Category: "Pilze",
    Tags: ["Pilze", "Getränke", "Vegetarisch"],
    image:
      "https://image.essen-und-trinken.de/11953132/t/SR/v10/w1440/r1.5/-/chefkoch-bananen-frapuccino-jpg--65498-.jpg",
    description: `Bratkartoffeln
      Für diese schnellen Bratkartoffeln haben wir Pellkartoffeln vom Vortag verwendet, diese mit Zwiebeln und Knoblauch gebraten und mit Kümmel, Thymian, Paprika sowie Salz und Pfeffer abgeschmeckt. Ganz einfach zubereitet und sehr lecker.
      https://www.zentrum-der-gesundheit.de/rezepte/hauptgerichte/kartoffel-rezepte/bratkartoffeln`,
    date: new Date().toDateString(),
  },
  {
    id: "4",
    name: "Trüffel frapucino",
    Category: "Pilze",
    Tags: ["Pilze", "Getränke", "Vegetarisch"],
    image:
      "https://image.essen-und-trinken.de/11953132/t/SR/v10/w1440/r1.5/-/chefkoch-bananen-frapuccino-jpg--65498-.jpg",
    description: `Bratkartoffeln
      Für diese schnellen Bratkartoffeln haben wir Pellkartoffeln vom Vortag verwendet, diese mit Zwiebeln und Knoblauch gebraten und mit Kümmel, Thymian, Paprika sowie Salz und Pfeffer abgeschmeckt. Ganz einfach zubereitet und sehr lecker.
      https://www.zentrum-der-gesundheit.de/rezepte/hauptgerichte/kartoffel-rezepte/bratkartoffeln`,
    date: new Date().toDateString(),
  },
  {
    id: "4",
    name: "Trüffel frapucino",
    Category: "Pilze",
    Tags: ["Pilze", "Getränke", "Vegetarisch"],
    image:
      "https://image.essen-und-trinken.de/11953132/t/SR/v10/w1440/r1.5/-/chefkoch-bananen-frapuccino-jpg--65498-.jpg",
    description: `Bratkartoffeln
      Für diese schnellen Bratkartoffeln haben wir Pellkartoffeln vom Vortag verwendet, diese mit Zwiebeln und Knoblauch gebraten und mit Kümmel, Thymian, Paprika sowie Salz und Pfeffer abgeschmeckt. Ganz einfach zubereitet und sehr lecker.
      https://www.zentrum-der-gesundheit.de/rezepte/hauptgerichte/kartoffel-rezepte/bratkartoffeln`,
    date: new Date().toDateString(),
  },
  {
    id: "4",
    name: "Leberkäse",
    Category: "Fleisch",
    Tags: ["Fleisch", "Käse"],
    image:
      "https://www.wagners-kulinarium.at/wp-content/uploads/Leberk%C3%A4se-fertig.png",
    description: `Bratkartoffeln
      Für diese schnellen Bratkartoffeln haben wir Pellkartoffeln vom Vortag verwendet, diese mit Zwiebeln und Knoblauch gebraten und mit Kümmel, Thymian, Paprika sowie Salz und Pfeffer abgeschmeckt. Ganz einfach zubereitet und sehr lecker.
      https://www.zentrum-der-gesundheit.de/rezepte/hauptgerichte/kartoffel-rezepte/bratkartoffeln`,
    date: new Date().toDateString(),
  },
  {
    id: "4",
    name: "Pilzsuppe",
    Category: "Pilze",
    Tags: ["Pilze", "Suppe"],
    image:
      "https://img.chefkoch-cdn.de/rezepte/1839111298104264/bilder/1106432/crop-960x720/pilzsuppe.jpg",
    description: `Bratkartoffeln
      Für diese schnellen Bratkartoffeln haben wir Pellkartoffeln vom Vortag verwendet, diese mit Zwiebeln und Knoblauch gebraten und mit Kümmel, Thymian, Paprika sowie Salz und Pfeffer abgeschmeckt. Ganz einfach zubereitet und sehr lecker.
      https://www.zentrum-der-gesundheit.de/rezepte/hauptgerichte/kartoffel-rezepte/bratkartoffeln`,
    date: new Date().toDateString(),
  },
  {
    id: "4",
    name: "Kartoffel-Gratin",
    Category: "Kartoffeln",
    Tags: ["Kartoffeln", "Käse", "Auflauf"],
    image:
      "https://img.chefkoch-cdn.de/rezepte/837601188560864/bilder/971685/crop-960x720/kartoffelgratin.jpg",
    description: `Bratkartoffeln
      Für diese schnellen Bratkartoffeln haben wir Pellkartoffeln vom Vortag verwendet, diese mit Zwiebeln und Knoblauch gebraten und mit Kümmel, Thymian, Paprika sowie Salz und Pfeffer abgeschmeckt. Ganz einfach zubereitet und sehr lecker.
      https://www.zentrum-der-gesundheit.de/rezepte/hauptgerichte/kartoffel-rezepte/bratkartoffeln`,
    date: new Date().toDateString(),
  },
  {
    id: "4",
    name: "Bratkartoffeln",
    Category: "Kartoffeln",
    Tags: ["Kartoffeln", "Hot"],
    image:
      "https://s.zentrum-der-gesundheit.de/img/904bbf36e6008d34d0f12e72fbbbb147",
    description: `Bratkartoffeln
      Für diese schnellen Bratkartoffeln haben wir Pellkartoffeln vom Vortag verwendet, diese mit Zwiebeln und Knoblauch gebraten und mit Kümmel, Thymian, Paprika sowie Salz und Pfeffer abgeschmeckt. Ganz einfach zubereitet und sehr lecker.
      https://www.zentrum-der-gesundheit.de/rezepte/hauptgerichte/kartoffel-rezepte/bratkartoffeln`,
    date: new Date().toDateString(),
  },
]

export default recipeData
