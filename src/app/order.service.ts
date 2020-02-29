import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orders:Array<any>= [
    {id: '0000', quantity: 9, total: 27.99, date: 'January 9th, 2020'},
    {id: '0001', quantity: 1, total: 10.99, date: 'February 8th, 2020'},
    {id: '0002', quantity: 3, total: 6.99, date: 'January 12th, 2020'},
    {id: '0003', quantity: 6, total: 8.99, date: 'January 3rd, 2020'},
    {id: '0004', quantity: 2, total: 20.99, date: 'January 9th, 2020'},
  ]
    
  constructor() {}
    
  createOrder(quantity:number,total:number,
                  date:string){
    this.orders.push({
      'id': Math.floor(Math.random() * Math.floor(4000)),
      'quantity': quantity,
      'total': total,
      'date' : date
    });
  }
  
  getProducts():Array<any> {
    return this.orders;
  }
}
  