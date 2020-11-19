import { ServiceService } from './../service/service.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-my-watchlist',
  templateUrl: './my-watchlist.component.html',
  styleUrls: ['./my-watchlist.component.css']
})
export class MyWatchlistComponent implements OnInit {
  customerSlug: string = "";
  stock: Stock;
 maxNum:number = 30;
 numOfBuyStock:number = 0;
 numOfSellStock:number = 0;
  stockList = [
    {Name: "aaba", Price:0.52 , CurPrice : 0,SellPrice : 0,BuyPrice : 0, Down : false},
    {Name: "fsea", Price:0.65 , CurPrice : 0,SellPrice : 0,BuyPrice : 0, Down : false},
    {Name: "fea", Price:0.14 , CurPrice : 0,SellPrice : 0,BuyPrice : 0, Down : false},
    {Name: "faesf", Price:0.64 , CurPrice : 0,SellPrice : 0,BuyPrice : 0, Down : false},
    {Name: "tht", Price:0.35 , CurPrice : 0,SellPrice : 0,BuyPrice : 0, Down : false},
    {Name: "ythyh", Price:0.47, CurPrice : 0,SellPrice : 0,BuyPrice : 0, Down : false},
    {Name: "wdwD", Price:0.15, CurPrice : 0,SellPrice : 0,BuyPrice : 0 , Down : false},
    {Name: "kihl", Price:0.37, CurPrice : 0,SellPrice : 0,BuyPrice : 0 , Down : false},
  ];

 // @Input() slug: string;
  constructor(private service: ServiceService) {

   }

  ngOnInit(): void {
    this.randomCurPrice();
    this.stockAction(true,"aaba");
    this.stockAction(true,"kihl");
    this.numOfBuyStock = this.service.getstockBuy();
    this.numOfSellStock = this.service.getstockSell();
   //this.randomElements(5);
    //this.doFilter(5,"Name");
  }
  private isAscendingSort: boolean = false;
  private isAscendingSortNum: boolean = false;
  doFilter(n: number,property: string){
      this.isAscendingSort = !this.isAscendingSort;
      this.stockList = this.stockList.sort(this.service.dynamicSort(property,this.isAscendingSort));
      this.stockList = this.stockList.slice(0, n);
  }
  filterNums(n: number,property: string){
    this.isAscendingSortNum = !this.isAscendingSortNum;
    if(this.isAscendingSortNum){
      this.stockList =  this.stockList.sort((a, b) => (b[property] - a[property]));
    }else{
      this.stockList =  this.stockList.sort((a, b) => (a[property] - b[property]));
    }
    this.stockList = this.stockList.slice(0, n);
  }
  
  randomElements(max:number){
    this.stockList = this.service.getNRandomValuesFromArray(this.stockList,max)
  }
 
  stockAction(buy: boolean, name:string){
    let s = this.stockList.find(obj => {
      return obj["Name"] === name
    });
    let stock = s as Stock;
      if(buy == true){
        this.service.setStockBuy(stock);
      }else{
        this.service.setStockSell(stock);
      }
      this.numOfBuyStock = this.service.getstockBuy();
      this.numOfSellStock = this.service.getstockSell();
  }

  randomCurPrice(){
    this.stockList.forEach(element => {
      let curPrice = Math.floor(Math.random() * (99) + 0)/100;
     // console.log(curPrice)
      let cur = curPrice.toFixed(2);
      element.CurPrice = +cur;
      if(element.CurPrice < element.Price){
        element.Down = true;
      }
      let buy = (element.CurPrice + 0.02).toFixed(2);
      element.BuyPrice = +buy;
      let sell = (element.CurPrice - 0.02).toFixed(2);
      element.SellPrice = +sell;
    });
  }
  //  randomNumber(min, max) {  
  //   return Math.random() * (max - min) + min; 
  // }  
}
export class Stock{
    Name:string;
    Price:number;
    CurPrice:number;
    Down:boolean;
    SellPrice:number;
    BuyPrice:number;
}
