import { ObjectId } from "mongodb";


export interface Product {
  _id: ObjectId;
  PRDUCT: string;
  ENTRPS: string;
  BASE_STANDARD: string;
  MAIN_FNCTN: string;
  INTAKE_HINT1: string;
  SUNGSANG: string;
  price: number;
}

export interface Vecotr {
  _id: ObjectId;
  PRDUCT: string;
  ENTRPS: string;
}
