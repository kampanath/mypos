import { Component, OnInit } from '@angular/core';
import { Product } from "src/app/models/product.model";
import { Location } from '@angular/common'
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-stock-create',
  templateUrl: './stock-create.component.html',
  styleUrls: ['./stock-create.component.css']
})
export class StockCreateComponent implements OnInit {

  mProduct = new Product();
  imageSrc: string | ArrayBuffer = null;

  constructor(private localtion: Location, private networkService: NetworkService) {
    this.mProduct.name = '';
    this.mProduct.stock = 0;
    this.mProduct.price = 0;
  }

  ngOnInit() {

  }

  submit() {
    this.networkService.addProduct(this.mProduct).subscribe(
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
