import { Directive, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../Models/Models';

@Directive({
  selector: '[appOpenItems]'
})
export class OpenItemsDirective {
  @Input() category: Category = {
    id: 0,
    category: '',
    subCategory: '',
  };

  @HostListener('click') openItems() {
    this.router.navigate(['/items'], {
      queryParams: {
        category: this.category.category,
        subcategory: this.category.subCategory,
      },
    });
  }

  constructor(private router: Router) {}

}
