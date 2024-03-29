import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Category, Order, Payment, PaymentMethod, User } from '../Models/Models';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  baseurl = 'https://localhost:7149/api/ClothingShop';

  constructor(private http: HttpClient) {}

  getCategoryList() {
    let url = this.baseurl + '/GetCategoryList';
    return this.http.get<any[]>(url).pipe(
      map((categories) =>
        categories.map((category) => {
          let mappedCategory: Category = {
            id: category.id,
            category: category.category,
            subCategory: category.subCategory,
          };
          return mappedCategory;
        })
      )
    );
  }

  getItems(category: string, subcategory: string, count: number) {
    return this.http.get<any[]>(this.baseurl + '/GetItems', {
      params: new HttpParams()
        .set('category', category)
        .set('subcategory', subcategory)
        .set('count', count),
    });
  }

  getItem(id: number) {
    let url = this.baseurl + '/GetItem/' + id;
    return this.http.get(url);
  }

  registerUser(user: User) {
    let url = this.baseurl + '/RegisterUser';
    return this.http.post(url, user, { responseType: 'text' });
  }

  loginUser(email: string, password: string) {
    let url = this.baseurl + '/LoginUser';
    return this.http.post(
      url,
      { Email: email, Password: password },
      { responseType: 'text' }
    );
  }

  submitReview(userid: number, itemid: number, review: string) {
    let obj: any = {
      User: {
        Id: userid,
      },
      Item: {
        Id: itemid,
      },
      Value: review,
    };

    let url = this.baseurl + '/InsertReview';
    return this.http.post(url, obj, { responseType: 'text' });
  }

  getAllReviewsOfItem(itemId: number) {
    let url = this.baseurl + '/GetItemReviews/' + itemId;
    return this.http.get(url);
  }

  addToCart(userid: number, itemid: number) {
    let url = this.baseurl + '/InsertCartItem/' + userid + '/' + itemid;
    return this.http.post(url, null, { responseType: 'text' });
  }

  deleteCartItem(userid: number, itemid: number) {
    let url = this.baseurl + '/DeleteCartItem/' + userid + '/' + itemid;
    return this.http.delete(url, { responseType: 'text' });
  }

  getActiveCartOfUser(userid: number) {
    let url = this.baseurl + '/GetActiveCartOfUser/' + userid;
    return this.http.get(url);
  }

  getAllPreviousCarts(userid: number) {
    let url = this.baseurl + '/GetAllPreviousCartsOfUser/' + userid;
    return this.http.get(url);
  }

  getPaymentMethods() {
    let url = this.baseurl + '/GetPaymentMethods';
    return this.http.get<PaymentMethod[]>(url);
  }

  insertPayment(payment: Payment) {
    return this.http.post(this.baseurl + '/InsertPayment', payment, {
      responseType: 'text',
    });
  }

  insertOrder(order: Order) {
    return this.http.post(this.baseurl + '/InsertOrder', order);
  }
}
