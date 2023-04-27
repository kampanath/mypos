import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { Location } from '@angular/common'
import { NetworkService } from 'src/app/services/network.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-stock-edit',
  templateUrl: './stock-edit.component.html',
  styleUrls: ['./stock-edit.component.css']
})
export class StockEditComponent implements OnInit {

  mProduct: Product = null;
  imageSrc: string | ArrayBuffer = null;

  constructor(
    private localtion: Location,
    private networkService: NetworkService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.feedData(params.id);
    });
  }

  feedData(id: string) {
    this.networkService.getProductBy(id).subscribe(
      data => {
        var image = data.result.image;
        if (image) {
          data.result.image = this.networkService.productImageURL + image
        }
        this.mProduct = data.result
      },
    );
  }

  submit() {
    this.networkService.editProduct(this.mProduct, this.mProduct.productId.toString()).subscribe(
      data => {
        alert(data.message);
        this.localtion.back();
      },
    );
  }

  cancel() {
    this.localtion.back();
  }

  onUploadImage(event) {
    const metaImage = event.target.files[0];
    if (metaImage) {
      const reader = new FileReader();
      reader.readAsDataURL(metaImage);
      reader.onload = () => {
        this.imageSrc = reader.result;
        this.mProduct.image = metaImage;
      };
    }
  }
}
