import { ChangeDetectorRef, Component } from '@angular/core';
import { Cart, Payment } from '../../../Models/Models';
import { UtilityService } from '../../../Services/utility.service';
import { NavigationService } from '../../../Services/navigation.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  usersCart: Cart = {
    id: 0,
    user: this.utilityService.getUser(),
    cartItems: [],
    ordered: false,
    orderedOn: '',
  };

  usersPaymentInfo: Payment = {
    id: 0,
    user: this.utilityService.getUser(),
    paymentMethod: {
      id: 0,
      type: '',
      provider: '',
      available: false,
      reason: '',
    },
    totalAmount: 0,
    shipingCharges: 0,
    amountReduced: 0,
    amountPaid: 0,
    createdAt: '',
  };

  usersPreviousCarts: Cart[] = [];

  constructor(
    public utilityService: UtilityService,
    private navigationService: NavigationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Get Cart
    this.navigationService
      .getActiveCartOfUser(this.utilityService.getUser().id)
      .subscribe((res: any) => {
        this.usersCart = res;

        // Calculate Payment
        this.utilityService.calculatePayment(
          this.usersCart,
          this.usersPaymentInfo
        );
      });

    // Get Previous Carts
    this.navigationService
      .getAllPreviousCarts(this.utilityService.getUser().id)
      .subscribe((res: any) => {
        this.usersPreviousCarts = res;
      })    
  }
  
  deleteItemFromCart(cartItem: any) {
    const userId = this.utilityService.getUser().id;
  
    this.navigationService.deleteCartItem(userId, cartItem.item.id)
      .subscribe(() => {
        this.navigationService.getActiveCartOfUser(userId)
          .subscribe((res: any) => {
            this.usersCart = res;
            this.utilityService.calculatePayment(this.usersCart, this.usersPaymentInfo);

            this.cdr.detectChanges();
          });
      });
  }
}
