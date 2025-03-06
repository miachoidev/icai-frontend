import { ObjectId } from "mongodb";


export interface Product {
  _id: ObjectId;
  TYPE?: string;
  PRODUCT: string;
  ENTRPS: string;
  BASE_STANDARD?: string;
  MAIN_FNCTN?: string;
  INTAKE_HINT1?: string;
  SUNGSANG?: string;
  CATEGORY2?: string;
  CATEGORY1?: string;
  price: number;
  image: string;
  RAWMTRL_NM?: string;
  KCAL?: number;
  CARBO?: number;
  PROT?: number;
  FAT?: number;
  SUGAR?: number;
  SO?: number;
  T_FAT?: number;
  S_FAT?: number;
  CHOL?: number;
}

export interface Vecotr {
  _id: ObjectId;
  PRDUCT: string;
  ENTRPS: string;
}
