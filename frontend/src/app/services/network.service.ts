import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Login, Register } from '../models/user.model';
import { ProductAll, ProductBY, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private hostURL = environment.baseAPIURL;
  private apiURL = `${this.hostURL}/api`;
  // -----------------------------------------------------
  private loginURL = `${this.apiURL}/auth/login`;
  private registerURL = `${this.apiURL}/auth/register`;
  private productURL = `${this.apiURL}/product`;
  public productImageURL = `${this.apiURL}/product/images/`;
  private outOfStockURL = `${this.productURL}/count/out_of_stock`;
  private transactionURL = `${this.apiURL}/transaction`;

  constructor(private httpClient: HttpClient) { }

  login(user): Observable<Login> {
    return this.httpClient.post<Login>(this.loginURL, user);
  }

  register(user): Observable<Register> {
    return this.httpClient.post<Register>(this.registerURL, user);
  }

  getProductAll(): Observable<ProductAll> {
    return this.httpClient.get<ProductAll>(this.productURL);
  }

  getProductBy(id: string): Observable<ProductBY> {
    return this.httpClient.get<ProductBY>(`${this.productURL}/${id}`);
  }

  deleteProduct(id: string): Observable<ProductBY> {
    return this.httpClient.delete<ProductBY>(`${this.productURL}/${id}`);
  }

  addProduct(product: Product): Observable<ProductBY> {
    return this.httpClient.post<ProductBY>(this.productURL, this.makeForm(product));
  }

  editProduct(product: Product, id: string): Observable<ProductBY> {
    return this.httpClient.put<ProductBY>(`${this.productURL}/${id}`, this.makeForm(product));
  }

  makeForm(product: Product): any {
    var formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price.toString());
    formData.append("stock", product.stock.toString());
    formData.append("image", product.image);
    return formData;
  }
}

