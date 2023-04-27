import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from "sweetalert2";
import { Subject, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NetworkService } from 'src/app/services/network.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-stock-home',
  templateUrl: './stock-home.component.html',
  styleUrls: ['./stock-home.component.css']
})

export class StockHomeComponent implements OnInit {

  mProductArray: Product[] = null;

  mSearchProductArray: Product[] = null;

  searchTextChanged = new Subject<string>();

  constructor(private router: Router, private networkService: NetworkService) { }

  ngOnInit() {
    this.searchTextChanged.pipe(
      debounceTime(3000)
    ).subscribe((data) => {
      if (data === '') {
        this.feedData();
      } else {
        this.mProductArray = this.mSearchProductArray.filter(
          product => {
            return product.name.toLowerCase().indexOf(data.toLowerCase()) > -1
          }
        );
      }
    });

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
        this.mSearchProductArray = data.result;
        this.getOutOfStock();
      },
    );
  }

  getOutOfStock(): number {
    return this.mProductArray.filter((product) => {
      return product.stock == 0;
    }).length;
  }

  edit(id: string) {
    this.router.navigate([`/stock/edit/${id}`])
  }

  delete(id: string) {
    // async => callback
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this! " + id,
      icon: 'warning',
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      //callback
      if (result.value) {

        this.networkService.deleteProduct(id).subscribe(
          data => {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
            this.feedData();
          },
        );
      }

    })
  }
}
