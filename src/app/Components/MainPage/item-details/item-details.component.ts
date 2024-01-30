import { Component } from '@angular/core';
import { Item, Review } from '../../../Models/Models';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../../../Services/navigation.service';
import { UtilityService } from '../../../Services/utility.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css'
})
export class ItemDetailsComponent {
  imageIndex: number = 1;
  item!: Item;
  reviewControl = new FormControl('');
  showError = false;
  reviewSaved = false;
  otherReviews: Review[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
    public utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      let id = params.id;
      this.navigationService.getItem(id).subscribe((res: any) => {
        this.item = res;
        this.fetchAllReviews();
      });
    });

  }

  submitReview() {
    let review = this.reviewControl.value;

    if (review === '' || review === null) {
      this.showError = true;
      return;
    }

    let userid = this.utilityService.getUser().id;
    let itemid = this.item.id;

    this.navigationService
      .submitReview(userid, itemid, review)
      .subscribe((res) => {
        this.reviewSaved = true;
        this.fetchAllReviews();
        this.reviewControl.setValue('');
      });
  }

  fetchAllReviews() {
    this.otherReviews = [];
    this.navigationService
      .getAllReviewsOfItem(this.item.id)
      .subscribe((res: any) => {
        for (let review of res) {
          this.otherReviews.push(review);
        }
      });
  }
}
