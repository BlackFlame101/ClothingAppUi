import { Component, ElementRef, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Category, NavigationItem, UserType } from '../../../Models/Models';
import { NavigationService } from '../../../Services/navigation.service';
import { UtilityService } from '../../../Services/utility.service';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @ViewChild('modalTitle') modalTitle!: ElementRef;
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  cartItems: number = 0;
  isUserAdmin: boolean = false;

  navigationList: NavigationItem[] = [];
  constructor(
    private navigationService: NavigationService,
    public utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    // Get Category List
    this.navigationService.getCategoryList().subscribe((list: Category[]) => {
      for (let item of list) {
        let present = false;
        for (let navItem of this.navigationList) {
          if (navItem.category === item.category) {
            navItem.subcategories.push(item.subCategory);
            present = true;
          }
        }
        if (!present) {
          this.navigationList.push({
            category: item.category,
            subcategories: [item.subCategory],
          });
        }
      }
    });
    // Cart
    if (this.utilityService.isLoggedIn()) {
      this.navigationService
        .getActiveCartOfUser(this.utilityService.getUser().id).pipe(take(1))
        .subscribe((res: any) => {
          this.cartItems = res.cartItems.length;
        });
  }
  this.utilityService.changeCart.subscribe((res: any) => {
    if (parseInt(res) === 0) this.cartItems = 0;
    else this.cartItems += parseInt(res);
  });
}

  openModal(name: string) {
    this.container.clear();

    let componentType!: Type<any>;
    if (name === 'login') {
      componentType = LoginComponent;
      this.modalTitle.nativeElement.textContent = 'Enter Login Information';
    }
    if (name === 'register') {
      componentType = RegisterComponent;
      this.modalTitle.nativeElement.textContent = 'Enter Register Information';
    }

    this.container.createComponent(componentType);

    if (this.utilityService.isLoggedIn()) {
      const user = this.utilityService.getUser();

   
      console.log('User Type:', user.userType);
      if (user && user.userType === UserType.Admin) {
        this.isUserAdmin = true;
      }
  }
}
}
