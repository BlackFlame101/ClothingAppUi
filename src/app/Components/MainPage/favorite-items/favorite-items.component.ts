import { Component, Input, OnInit } from '@angular/core';
import { Category, Item } from '../../../Models/Models';
import { NavigationService } from '../../../Services/navigation.service';

@Component({
  selector: 'app-favorite-items',
  templateUrl: './favorite-items.component.html',
  styleUrl: './favorite-items.component.css'
})
export class FavoriteItemsComponent  implements OnInit{
  @Input() category: Category = {
    id: 0,
    category: '',
    subCategory: '',
  };
  @Input() count: number = 3;
  items: Item[] = [];

  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
    this.navigationService
    .getItems(
      this.category.category,
      this.category.subCategory,
      this.count
    )
    .subscribe((res: any[]) => {
      for (let item of res) {
        this.items.push(item);
      }
    });
  }
}
