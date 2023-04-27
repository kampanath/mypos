import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-shop-home',
  templateUrl: './shop-home.component.html',
  styleUrls: ['./shop-home.component.css']
})
export class ShopHomeComponent implements OnInit {

  mProductArray = new Array<Product>();
  mOrderArray = new Array<Product>();
  mTotalPrice = 0;
  mIsPayment = false;

  constructor(private networkService: NetworkService) { }

  ngOnInit() {
    this.feedData();
  }

  feedData() {
    this.networkService.getProductAll().subscribe(
      data => {
        // console.log(JSON.stringify(data.result));
        this.mProductArray = data.result.map(
          item => {
            var image = item.image;
            if (image) {
              item.image = this.networkService.productImageURL + item.image
            }
            return item
          }
        )
      },
    );
  }

  onClickAddOrder(item: Product, add: boolean) {
    if (this.mOrderArray.indexOf(item) !== -1) {
      if (!add) {
        item.qty++;
      } else {
        if (item.qty > 1) {
          item.qty--;
        }
      }
    } else {
      item.qty = 1;
      this.mOrderArray.unshift(item);
    }

    this.sum();
  }

  sum() {
    this.mTotalPrice = 0;

    this.mOrderArray.forEach(item => {
      this.mTotalPrice = this.mTotalPrice + item.price * item.qty;
    });
  }

  onClickRemoveOrder(item: Product) {
    var index = this.mOrderArray.indexOf(item);
    // [11, 22, 33, 44, 55]
    // this.mOrderArray.splice(2, 2);
    this.mOrderArray.splice(index, 1);

    this.sum();
  }

  onClickPayment() {
    if (this.mTotalPrice > 0) {
      this.mIsPayment = true;
    } else {
      alert("Order not empty");
    }
  }

  onPaymentCompleted() {
    this.mOrderArray = new Array();
    this.mProductArray = new Array();
    this.mTotalPrice = 0;
    this.mIsPayment = false;

    this.feedData();
  }

  isSelectedItem(item: Product): boolean {
    return this.mOrderArray.indexOf(item) !== -1
  }

}
