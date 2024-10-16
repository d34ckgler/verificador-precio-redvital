export interface IProduct {
  sku: string;
  name: string;
  description: string;
  price: number;
  tax: number;
  detail: Array<IBranch | IBranchOnly> | IBranch;
}

export interface IBranchOnly {
  [key: string]: string;
}

export interface IBranch {
  branch: string;
  price: number;
  stock: number;
}
