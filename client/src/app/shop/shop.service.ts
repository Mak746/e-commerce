import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {IPagination} from '../shared/models/Pagination'
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/type';
import {map} from 'rxjs/operators';
import { shopParams } from '../shared/models/shopPrams';
import { IProduct } from '../shared/models/Product';
@Injectable({
  providedIn: 'root'
})
export class ShopService {
baseUrl='https://localhost:5001/api/'
  constructor(private http : HttpClient) { }

  getProducts(shopParams: shopParams){
    let params=new HttpParams();
    if(shopParams.brandIdSelected !==0){
      params=params.append('brandId',shopParams.brandIdSelected.toString())
    }
    if(shopParams.typeIdSelected !==0){
      params=params.append('typeId',shopParams.typeIdSelected.toString())
    }
     if(shopParams.search){
       params=params.append('search',shopParams.search);
     }
      params=params.append('sort',shopParams.sortSelected);
      params=params.append('pageIndex',shopParams.pageNumber.toString());
      params=params.append('pageSize',shopParams.pageSize.toString());

    return this.http.get<IPagination>(this.baseUrl+'products',{observe:'response',params}).pipe(
      map(response=>{
    
        return response.body;
      })
    );
  }
  getProduct(id:number){
  return this.http.get<IProduct>(this.baseUrl+'products/'+id);
  }
  getBrands(){
    return this.http.get<IBrand[]>(this.baseUrl+'products/brands');
  }
  getTypess(){
    return this.http.get<IType[]>(this.baseUrl+'products/types');
  }
}
