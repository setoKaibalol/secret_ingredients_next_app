const tagData = [
  {
    name: "Reis",
    id: "0",
    zutat: true,
    category: "Getreide",
    untergruppen: [
      {
        name: "Langkorn Reis",
        nährstoffe: [
          {
            eiweiß: "10g",
            kohlenhydrate: "40g",
          },
        ],
      },
      {
        name: "Jasmin Reis",
      },
      {
        name: "Basmati Reis",
      },
      {
        name: "Wild Reis",
      },
    ],
    vegetarisch: true,
    vegan: true,
    mengeneinheiten: [
      {
        name: "Becher",
      },
      {
        name: "Gramm",
      },
    ],
  },
  {
    name: "Vegetarisch",
    id: "1",
    zutat: false,
  },
  {
    name: "Fleisch",
    id: "2",
    zutat: false,
  },
  {
    name: "Nudeln",
    id: "3",
    zutat: true,
    category: "Getreide",
    untergruppen: [
      {
        name: "Penne",
      },
      {
        name: "Maccheroni",
      },
      {
        name: "Fusilli",
      },
      {
        name: "Spagetti",
      },
      {
        name: "Canneroni",
      },
    ],
    vegetarisch: true,
    mengeneinheiten: [
      {
        name: "Becher",
      },
      {
        name: "Gramm",
      },
    ],
  },
  {
    name: "Pizza",
    id: "4",
    zutat: false,
  },
  {
    name: "Hot",
    id: "5",
    zutat: false,
  },
  {
    name: "Tomate",
    id: "6",
    zutat: true,
    category: "Gemüse",
    mengeneinheiten: [
      {
        name: "Stück",
      },
      {
        name: "Gramm",
      },
    ],
  },
  {
    name: "Käse",
    id: "7",
    zutat: false,
  },
  {
    name: "Karotten",
    id: "8",
    zutat: true,
    category: "Gemüse",
    mengeneinheiten: [
      {
        name: "Stück",
      },
      {
        name: "Gramm",
      },
    ],
  },
  {
    name: "Hähnchen",
    id: "9",
    zutat: true,
    category: "Fleisch",
    untergruppen: [
      {
        name: "Ganzes Hähnchen",
      },
      {
        name: "Hähnchenflügel",
      },
      {
        name: "Hähnchenbrust",
      },
      {
        name: "Hähnchenschenkel",
      },
      {
        name: "Hähnchenrippe",
      },
      {
        name: "Hähnchenflügel",
      },
    ],
    mengeneinheiten: [
      {
        name: "Stück",
      },
      {
        name: "gramm",
      },
    ],
  },
  {
    name: "Getränke",
    id: "10",
    zutat: false,
  },
  {
    name: "Fisch",
    id: "11",
    zutat: false,
  },
  {
    name: "Kartoffeln",
    id: "12",
    zutat: true,
    category: "Gemüse",
    untergruppen: [
      {
        name: "Festkochend",
      },
      {
        name: "Mehligkochend",
      },
      {
        name: "Hartkochend",
      },
    ],
    mengeneinheiten: [
      {
        name: "Stück",
      },
      {
        name: "Gramm",
      },
    ],
  },
  {
    name: "Sellerie",
    id: "13",
    zutat: true,
    category: "Gemüse",
    mengeneinheiten: [
      {
        name: "Stück",
      },
      {
        name: "Gramm",
      },
    ],
  },
  {
    name: "Italienisch",
    id: "14",
    zutat: false,
  },
  {
    name: "Afrikanisch",
    id: "15",
    zutat: false,
  },
  {
    name: "Deutsch",
    id: "16",
    zutat: false,
  },
  {
    name: "Kalt",
    id: "17",
    zutat: false,
  },
  {
    name: "Saisonal",
    id: "18",
    zutat: false,
  },
  {
    name: "Ente",
    id: "19",
    zutat: true,
    category: "Fleisch",
    untergruppen: [
      {
        name: "Ganze Ente",
      },
      {
        name: "Entenbrust",
      },
      {
        name: "Entenschenkel",
      },
      {
        name: "Entennacken",
      },
      {
        name: "Entenflügel",
      },
    ],
    mengeneinheiten: [
      {
        name: "Stück",
      },
      {
        name: "Gramm",
      },
    ],
  },
  {
    name: "Wild",
    id: "20",
    zutat: false,
  },
  {
    name: "Pasta",
    id: "21",
    zutat: false,
  },
  {
    name: "Hartkäse",
    id: "22",
    zutat: true,
    category: "Käse",
    untergruppen: [
      {
        name: "Parmesan",
      },
      {
        name: "Emmentaler",
      },
      {
        name: "Cheddar",
      },
      {
        name: "Bergkäse",
      },
      {
        name: "Gruyère",
      },
    ],
    mengeneinheiten: [
      {
        name: "Stück",
      },
      {
        name: "Gramm",
      },
      {
        name: "Scheiben",
      },
    ],
  },
  {
    name: "Frischkäse",
    id: "23",
    zutat: true,
    category: "Käse",
    untergruppen: [
      {
        name: "Doppelrahmfrischkäse",
      },
      {
        name: "Rahmfrischkäse",
      },
      {
        name: "Mozzarella",
      },
      {
        name: "Hüttenkäse",
      },
      {
        name: "Quark",
      },
      {
        name: "Schichtkäse",
      },
      {
        name: "Ricotta",
      },
    ],
    mengeneinheiten: [
      {
        name: "Becher",
      },
      {
        name: "Gramm",
      },
    ],
  },
]

export default tagData
