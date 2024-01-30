import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './Components/MainPage/page-not-found/page-not-found.component';
import { OrderComponent } from './Components/MainPage/order/order.component';
import { CartComponent } from './Components/MainPage/cart/cart.component';
import { ItemDetailsComponent } from './Components/MainPage/item-details/item-details.component';
import { ItemsComponent } from './Components/MainPage/items/items.component';
import { MainComponent } from './Components/MainPage/main/main.component';

const routes: Routes = [
  { path: 'home', component: MainComponent },
  { path: 'items', component: ItemsComponent },
  { path: 'item-details', component: ItemDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'order', component: OrderComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
