import { Injectable } from '@angular/core';
import { Cart, Item, Payment, User, UserType } from '../Models/Models';
import { NavigationService } from './navigation.service';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  changeCart = new Subject();

  constructor(
    private navigationService: NavigationService,
    private jwt: JwtHelperService,
    
  ) {}

  applyDiscount(price: number, discount: number): number {
    let finalPrice: number = price - price * (discount / 100);
    return finalPrice;
  }

  

  getUser(): User {
    let token = this.jwt.decodeToken();
    console.log('Decoded JWT Payload:', token);
    
    let user: User = {
      id: token.id,
      firstName: token.firstName,
      lastName: token.lastName,
      address: token.address,
      mobile: token.mobile,
      email: token.email,
      password: '',
      createdAt: token.createdAt,
      modifiedAt: token.modifiedAt,
      userType: token.userType || UserType.User,  // Set a default value if undefined
    };
    return user;
  }
  

  setUser(token: string) {
    localStorage.setItem('user', token);
  }

  isLoggedIn() {
    return localStorage.getItem('user') ? true : false;
  }

  logoutUser() {
    localStorage.removeItem('user');
  }

  addToCart(item: Item) {
    let itemid = item.id;
    let userid = this.getUser().id;

    this.navigationService.addToCart(userid, itemid).subscribe((res) => {
      if (res.toString() === 'inserted') this.changeCart.next(1);
    });
  }

  calculatePayment(cart: Cart, payment: Payment) {
    payment.totalAmount = 0;
    payment.amountPaid = 0;
    payment.amountReduced = 0;

    for (let cartitem of cart.cartItems) {
      payment.totalAmount += cartitem.item.price;

      payment.amountReduced +=
        cartitem.item.price -
        this.applyDiscount(
          cartitem.item.price,
          cartitem.item.offer.discount
        );

      payment.amountPaid += this.applyDiscount(
        cartitem.item.price,
        cartitem.item.offer.discount
      );
    }

    if (payment.amountPaid > 50000) payment.shipingCharges = 2000;
    else if (payment.amountPaid > 20000) payment.shipingCharges = 1000;
    else if (payment.amountPaid > 5000) payment.shipingCharges = 500;
    else payment.shipingCharges = 200;
  }

  calculatePricePaid(cart: Cart) {
    let pricepaid = 0;
    for (let cartitem of cart.cartItems) {
      pricepaid += this.applyDiscount(
        cartitem.item.price,
        cartitem.item.offer.discount
      );
    }
    return pricepaid;
  }

  orderTheCart() {
    
  }
}
