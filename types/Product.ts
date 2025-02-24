import { ObjectId } from "mongodb";


export interface Product {
  _id: ObjectId;
  PRDUCT: string;
  ENTRPS: string;
  price: number;
}

export interface Vecotr {
  _id: ObjectId;
  PRDUCT: string;
  ENTRPS: string;
}
