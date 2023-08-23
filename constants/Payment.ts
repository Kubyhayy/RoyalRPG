import { PayMethods } from "@constants";
import { Item } from "./item";
import { PayMethod } from "./payMethod";

class Buyer {
  nick: string;
  email: string;

  constructor(nick: string, email: string) {
    this.nick = nick;
    this.email = email;
  }
}

export class Payment {
  private item: Item;
  private buyer: Buyer;
  private price: number;
  private description: string;
  private itemVariantID: number | null;
  private hiddenDescription: string;
  private payMethod: PayMethod | null;
  private additionalValues: {
    isDiscounted: boolean;
    hasAgreed: boolean;
  };

  constructor(item: Item) {
    this.item = item;
    this.buyer = new Buyer("", "");
    this.price = 0;
    this.itemVariantID = 0;
    this.description = item.name;
    this.hiddenDescription = "";
    this.payMethod = null;
    this.additionalValues = { isDiscounted: false, hasAgreed: false };
  }

  public setNick(nick: string) {
    this.buyer.nick = nick;
  }

  public setEmail(email: string) {
    this.buyer.email = email;
  }

  public setPayMethod(payMethod: PayMethod | null) {
    this.payMethod = payMethod;
  }

  public setItemVariant(variant: number | null) {
    this.itemVariantID = variant ?? 0;
    this.price = this.item.priceSteps[this.itemVariantID].price;
  }

  public setAgreed(b: boolean) {
    this.additionalValues.hasAgreed = b;
  }

  public setDiscounted(b: boolean) {
    this.additionalValues.isDiscounted = b;
  }

  public getNick() {
    return this.buyer.nick;
  }

  public getEmail() {
    return this.buyer.email;
  }

  public getPrice() {
    return this.price;
  }

  public getDescription() {
    return this.description;
  }

  public getItemVariantID() {
    return this.itemVariantID;
  }

  public getPayMethod() {
    return this.payMethod;
  }

  public toString() {
    return JSON.stringify(this);
  }

  public isReady() {
    return (
      this.buyer.nick.length >= 3 &&
      this.buyer.email.length >= 10 &&
      this.buyer.email.includes("@") &&
      this.price !== 0 &&
      this.itemVariantID !== 0 &&
      this.payMethod !== null
    );
  }
}
