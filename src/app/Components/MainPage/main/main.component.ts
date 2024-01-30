import { Component, OnInit } from '@angular/core';
import { FavoriteItem } from '../../../Models/Models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent  implements OnInit{
  favoriteItems: FavoriteItem[] = [
    {
      banerimage: 'Baner/Baner_Women.png',
      category: {
        id: 0,
        category: 'women',
        subCategory: 'womens-kaftan',
      },
    },
    {
      banerimage: 'Baner/Baner_Women.png',
      category: {
        id: 1,
        category: 'women',
        subCategory: 'womens-tshirt',
      },
    },
    {
      banerimage: 'Baner/Baner_Women.png',
      category: {
        id: 2,
        category: 'men',
        subCategory: 'mens-shoes',
      },
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}

