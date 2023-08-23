export interface Item {
  id: number;
  name: string;
  description: string;
  imageSrc: string;
  price: number | [min: number, max: number];
  priceSteps: {
    id: number;
    days: number;
    price: number;
    pricePerDay: number;
  }[];
}
