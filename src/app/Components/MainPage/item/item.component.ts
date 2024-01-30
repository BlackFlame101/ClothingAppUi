import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../../Models/Models';
import { UtilityService } from '../../../Services/utility.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent implements OnInit {
  @Input() view: 'grid' | 'list' | 'currcartitem' | 'prevcartitem' = 'grid';
  @Input() item: Item = {
    id: 0,
    title: '',
    description: '',
    price: 0,
    quantity: 0,
    itemCategory: {
      id: 1,
      category: '',
      subCategory: '',
    },
    offer: {
      id: 1,
      title: '',
      discount: 0,
    },
    imageName: '',
  };
 

  constructor(public utilityService: UtilityService) {}

  ngOnInit(): void {}
}
