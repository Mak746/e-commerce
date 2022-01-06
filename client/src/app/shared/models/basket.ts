    import uuid from 'uuid/v4';
    export interface IBasket {
        id: string;
        items: IBasketItem[];
    }

    export interface IBasketItem {
        id: number;
        productName: string;
        price: number;
        brand: string;
        type: string;
        pictureUrl: string;
        quantity: number;
    }

  export class Basket implements IBasket{
      id= uuid();
      items: IBasketItem[]=[];

  }
  export interface IBasketTotals{
      shipping:number;
      subtotal:number;
      total:number;
  }



