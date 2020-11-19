import { Injectable } from '@angular/core';
import { Stock } from '../my-watchlist/my-watchlist.component';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
 liststockBuy: StockBuy[] = [];
 liststockSell: StockSell[] = [];

  constructor() { }

  dynamicSort(property: string, sort: boolean) {
    return function (a,b) {
        if(sort == true){
            return b[property].localeCompare(a[property]);
        }else{
            return a[property].localeCompare(b[property]);
        }        
    }
  }
  getNRandomValuesFromArray(srcArr, n) {
    srcArr = srcArr.slice();
    let resultArr = [];
    while (srcArr.length && resultArr.length < n) {
        resultArr = resultArr.concat( 
            srcArr.splice(
                Math.floor(Math.random() * srcArr.length),1)
            );
    }
    return resultArr;
  }
  setStockBuy(stock: Stock){
    let stockBuy = new StockBuy();
    stockBuy.Name = stock.Name;
    stockBuy.PriceBuy = stock.BuyPrice;
    this.liststockBuy.push(stockBuy);
    console.log(this.liststockBuy.length)
  }
  setStockSell(stock: Stock){
    let stockSell = new StockSell();
    stockSell.Name = stock.Name;
    stockSell.PriceSell = stock.SellPrice;
    this.liststockSell.push(stockSell);
    console.log(this.liststockSell.length)
  }
  getstockBuy(){
    return this.liststockBuy.length;
  }
  getstockSell(){
    return this.liststockSell.length;
  }
}
export class StockBuy{
  Name:string;
  PriceBuy:number;
}
export class StockSell{
  Name:string;
  PriceSell:number;
}
