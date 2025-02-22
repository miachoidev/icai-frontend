import { ObjectId } from "mongodb";


export interface Product {
  _id: ObjectId;
  PRDUCT: string;
  ENTRPS: string;
  price: number;
}
