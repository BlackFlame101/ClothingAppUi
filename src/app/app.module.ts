import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/MainPage/header/header.component';
import { FooterComponent } from './Components/MainPage/footer/footer.component';
import { MainComponent } from './Components/MainPage/main/main.component';
import { PageNotFoundComponent } from './Components/MainPage/page-not-found/page-not-found.component';
import { LoginComponent } from './Components/MainPage/login/login.component';
import { RegisterComponent } from './Components/MainPage/register/register.component';
import { FavoriteItemsComponent } from './Components/MainPage/favorite-items/favorite-items.component';
import { ItemsComponent } from './Components/MainPage/items/items.component';
import { ItemComponent } from './Components/MainPage/item/item.component';
import { ItemDetailsComponent } from './Components/MainPage/item-details/item-details.component';
import { CartComponent } from './Components/MainPage/cart/cart.component';
import { OrderComponent } from './Components/MainPage/order/order.component';
import { OpenItemsDirective } from './Directives/open-items.directive';
import { OpenItemdetailsDirective } from './Directives/open-itemdetails.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { PaymentComponent } from './Components/MainPage/payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent,
    FavoriteItemsComponent,
    ItemsComponent,
    ItemComponent,
    ItemDetailsComponent,
    CartComponent,
    OrderComponent,
    OpenItemsDirective,
    OpenItemdetailsDirective,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          try {
            // Check if localStorage is defined
            if (typeof localStorage !== 'undefined') {
              return localStorage.getItem('user');
            }
          } catch (error) {
            console.error('Error accessing localStorage:', error);
          }

          return null; // or an empty string, depending on your application's logic
        },
        allowedDomains: ['localhost:7149'],
      },
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
