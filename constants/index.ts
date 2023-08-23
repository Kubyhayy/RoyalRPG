import { Item } from "./item";
import { PayMethod } from "./payMethod";

export const NavbarLinks = [
  { name: "Sklep", icon: "/shop-icon.svg", route: "/" },
  { name: "Regulamin", icon: "/rules-icon.svg", route: "/" },
  { name: "Ranking", icon: "/ranking-icon.svg", route: "/" },
  { name: "Kontakt", icon: "/contact-icon.svg", route: "/" },
];

export const FeatureCards = [
  {
    header: "Pluginy",
    imageSrc: "/feature-plugins-icon.svg",
    description:
      "Nasz serwer wzbogaca rozgrywkę za pomocą unikalnych, autorsko stworzonych pluginów, które dostarczają nowych funkcji, dynamicznych eventów i wyjątkowych wyzwań, dzięki czemu każda sesja gry jest niepowtarzalna.",
  },
  {
    header: "Pluginy",
    imageSrc: "/feature-plugins-icon.svg",
    description:
      "Nasz serwer wzbogaca rozgrywkę za pomocą unikalnych, autorsko stworzonych pluginów, które dostarczają nowych funkcji, dynamicznych eventów i wyjątkowych wyzwań, dzięki czemu każda sesja gry jest niepowtarzalna.",
  },
  {
    header: "Pluginy",
    imageSrc: "/feature-plugins-icon.svg",
    description:
      "Nasz serwer wzbogaca rozgrywkę za pomocą unikalnych, autorsko stworzonych pluginów, które dostarczają nowych funkcji, dynamicznych eventów i wyjątkowych wyzwań, dzięki czemu każda sesja gry jest niepowtarzalna.",
  },
  {
    header: "Pluginy",
    imageSrc: "/feature-plugins-icon.svg",
    description:
      "Nasz serwer wzbogaca rozgrywkę za pomocą unikalnych, autorsko stworzonych pluginów, które dostarczają nowych funkcji, dynamicznych eventów i wyjątkowych wyzwań, dzięki czemu każda sesja gry jest niepowtarzalna.",
  },
  {
    header: "Pluginy",
    imageSrc: "/feature-plugins-icon.svg",
    description:
      "Nasz serwer wzbogaca rozgrywkę za pomocą unikalnych, autorsko stworzonych pluginów, które dostarczają nowych funkcji, dynamicznych eventów i wyjątkowych wyzwań, dzięki czemu każda sesja gry jest niepowtarzalna.",
  },
  {
    header: "Pluginy",
    imageSrc: "/feature-plugins-icon.svg",
    description:
      "Nasz serwer wzbogaca rozgrywkę za pomocą unikalnych, autorsko stworzonych pluginów, które dostarczają nowych funkcji, dynamicznych eventów i wyjątkowych wyzwań, dzięki czemu każda sesja gry jest niepowtarzalna.",
  },
  {
    header: "Pluginy",
    imageSrc: "/feature-plugins-icon.svg",
    description:
      "Nasz serwer wzbogaca rozgrywkę za pomocą unikalnych, autorsko stworzonych pluginów, które dostarczają nowych funkcji, dynamicznych eventów i wyjątkowych wyzwań, dzięki czemu każda sesja gry jest niepowtarzalna.",
  },
  {
    header: "Pluginy",
    imageSrc: "/feature-plugins-icon.svg",
    description:
      "Nasz serwer wzbogaca rozgrywkę za pomocą unikalnych, autorsko stworzonych pluginów, które dostarczają nowych funkcji, dynamicznych eventów i wyjątkowych wyzwań, dzięki czemu każda sesja gry jest niepowtarzalna.",
  },
];

export const ShopItems: Item[] = [
  {
    id: 0,
    name: "Ranga VIP",
    imageSrc: "/vip.png",
    price: [10, 25],
    description:
      "Dołącz do Vipów i odkryj unikalne wydarzenia, bonusy rozwoju postaci, szereg zadań i misji, które nagradzają Ciebie dodatkowymi doświadczeniem i walutą serwerową oraz wiele innych wyjątkowych przywilejów! Przygotuj się na niezapomniane przygody.",
    priceSteps: [
      { id: 0, days: 1, price: 2.0, pricePerDay: 2.0 },
      { id: 1, days: 3, price: 5.0, pricePerDay: 1.67 },
      { id: 2, days: 7, price: 9.0, pricePerDay: 1.29 },
      { id: 3, days: 14, price: 15.0, pricePerDay: 1.07 },
      { id: 4, days: 30, price: 25.0, pricePerDay: 0.83 },
    ],
  },
  {
    id: 1,
    name: "Ranga Super VIP",
    imageSrc: "/super-vip.png",
    price: [20, 40],
    description:
      "Dołącz do Super Vipów i odkryj unikalne wydarzenia, bonusy rozwoju postaci, szereg zadań i misji, które nagradzają Ciebie dodatkowymi doświadczeniem i walutą serwerową oraz wiele innych wyjątkowych przywilejów! Przygotuj się na niezapomniane przygody.",
    priceSteps: [
      { id: 0, days: 3, price: 9, pricePerDay: 3.0 },
      { id: 1, days: 7, price: 18, pricePerDay: 2.57 },
      { id: 2, days: 14, price: 30.0, pricePerDay: 2.14 },
      { id: 3, days: 30, price: 50.0, pricePerDay: 2.0 },
    ],
  },
  {
    id: 2,
    name: "Ranga Sponsor",
    imageSrc: "/sponsor.png",
    price: [40, 60],
    description:
      "Dołącz do Sponsorów i odkryj unikalne wydarzenia, bonusy rozwoju postaci, szereg zadań i misji, które nagradzają Ciebie dodatkowymi doświadczeniem i walutą serwerową oraz wiele innych wyjątkowych przywilejów! Przygotuj się na niezapomniane przygody.",
    priceSteps: [
      { id: 0, days: 7, price: 25.0, pricePerDay: 3.57 },
      { id: 1, days: 14, price: 45, pricePerDay: 3.21 },
      { id: 2, days: 21, price: 60, pricePerDay: 2.85 },
      { id: 3, days: 30, price: 75, pricePerDay: 2.5 },
    ],
  },
  {
    id: 3,
    name: "Ranga VIP",
    imageSrc: "/vip.png",
    price: [10, 25],
    description:
      "Dołącz do Vipów i odkryj unikalne wydarzenia, bonusy rozwoju postaci, szereg zadań i misji, które nagradzają Ciebie dodatkowymi doświadczeniem i walutą serwerową oraz wiele innych wyjątkowych przywilejów! Przygotuj się na niezapomniane przygody.",
    priceSteps: [
      { id: 0, days: 1, price: 2.0, pricePerDay: 2.0 },
      { id: 1, days: 3, price: 5.0, pricePerDay: 1.67 },
      { id: 2, days: 7, price: 9.0, pricePerDay: 1.29 },
      { id: 3, days: 14, price: 15.0, pricePerDay: 1.07 },
      { id: 4, days: 30, price: 25.0, pricePerDay: 0.83 },
    ],
  },
  {
    id: 4,
    name: "Ranga Super VIP",
    imageSrc: "/super-vip.png",
    price: [20, 40],
    description:
      "Dołącz do Super Vipów i odkryj unikalne wydarzenia, bonusy rozwoju postaci, szereg zadań i misji, które nagradzają Ciebie dodatkowymi doświadczeniem i walutą serwerową oraz wiele innych wyjątkowych przywilejów! Przygotuj się na niezapomniane przygody.",
    priceSteps: [
      { id: 0, days: 3, price: 9, pricePerDay: 3.0 },
      { id: 1, days: 7, price: 18, pricePerDay: 2.57 },
      { id: 2, days: 14, price: 30.0, pricePerDay: 2.14 },
      { id: 3, days: 30, price: 50.0, pricePerDay: 2.0 },
    ],
  },
  {
    id: 5,
    name: "Ranga Sponsor",
    imageSrc: "/sponsor.png",
    price: [40, 60],
    description:
      "Dołącz do Sponsorów i odkryj unikalne wydarzenia, bonusy rozwoju postaci, szereg zadań i misji, które nagradzają Ciebie dodatkowymi doświadczeniem i walutą serwerową oraz wiele innych wyjątkowych przywilejów! Przygotuj się na niezapomniane przygody.",
    priceSteps: [
      { id: 0, days: 7, price: 25.0, pricePerDay: 3.57 },
      { id: 1, days: 14, price: 45, pricePerDay: 3.21 },
      { id: 2, days: 21, price: 60, pricePerDay: 2.85 },
      { id: 3, days: 30, price: 75, pricePerDay: 2.5 },
    ],
  },
];

export const PayMethods: PayMethod[] = [
  { id: 0, name: "Blik", imageSrc: "/blik.png" },
  { id: 1, name: "Paypal", imageSrc: "/paypal.png" },
  { id: 2, name: "PaysafeCard", imageSrc: "/paysafecard.png" },
  { id: 3, name: "Visa", imageSrc: "/visa.png" },
  { id: 4, name: "Mastercard", imageSrc: "/mastercard.png" },
];

export const PurchaseInfo: string[] = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
];
