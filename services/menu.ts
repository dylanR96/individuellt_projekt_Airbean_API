import getDateTime from "./currentTime.js";

const menu = [
  {
    _id: 1,
    title: "Bryggkaffe",
    desc: "Bryggd på månadens bönor.",
    price: 39,
    createdAt: getDateTime(),
  },
  {
    _id: 2,
    title: "Caffè Doppio",
    desc: "Bryggd på månadens bönor.",
    price: 49,
    createdAt: getDateTime(),
  },
  {
    _id: 3,
    title: "Cappuccino",
    desc: "Bryggd på månadens bönor.",
    price: 49,
    createdAt: getDateTime(),
  },
  {
    _id: 4,
    title: "Latte Macchiato",
    desc: "Bryggd på månadens bönor.",
    price: 49,
    createdAt: getDateTime(),
  },
  {
    _id: 5,
    title: "Kaffe Latte",
    desc: "Bryggd på månadens bönor.",
    price: 54,
    createdAt: getDateTime(),
  },
  {
    _id: 6,
    title: "Cortado",
    desc: "Bryggd på månadens bönor.",
    price: 39,
    createdAt: getDateTime(),
  },
];

export default menu;
