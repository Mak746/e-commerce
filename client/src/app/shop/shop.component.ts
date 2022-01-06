import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/Product';
import { shopParams } from '../shared/models/shopPrams';
import { IType } from '../shared/models/type';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchTerm:ElementRef;
 products:IProduct[];
 brands:IBrand[];
 types:IType[];
 shopPrams=new shopParams();
 tottalCounts:number;
 sortOption=[{name:'Alphabetical',value:'name'},
 {name:'Price: Low to High',value:'priceAsc'},
 {name:'Price: High to Low',value:'priceDesc'}]
  constructor( private service:ShopService ) { }

  ngOnInit(): void {
   this.getProducts();
   this.getBrands();
   this.getTypess();
  }
 getProducts(){
  return this.service.getProducts(this.shopPrams).subscribe(response =>{
     
     this.products=response.data;
     this.shopPrams.pageNumber=response.pageIndex;
     this.shopPrams.pageSize=response.pageSize;
     this.tottalCounts=response.count;
  },error=> console.log(error)); 
 }
 getBrands(){
   return this.service.getBrands().subscribe(response=>{
     this.brands=[{id:0,name:'All'},...response];
   },error=>console.log(error));
 }
 getTypess(){
  return this.service.getTypess().subscribe(response=>{
    this.types=[{id:0,name:'All'},...response];
  },error=>console.log(error));
}
onBrandSelected(brandId: number){
this.shopPrams.brandIdSelected=brandId;
this.shopPrams.pageNumber=1;
this.getProducts();
}
onTypeSelected(typeId: number){
  this.shopPrams.typeIdSelected=typeId;
  this.shopPrams.pageNumber=1;
  this.getProducts();
}
onSortSelected(sort: string){
  this.shopPrams.sortSelected=sort;
  this.getProducts();
}

onPageChanged(event:any){
  if(this.shopPrams.pageNumber !==event){
    this.shopPrams.pageNumber=event;
    this.getProducts();
  }

}
onSearch(){
  
  this.shopPrams.search=this.searchTerm.nativeElement.value;
  this.shopPrams.pageNumber=1;
  this.getProducts();
}
onReset(){
  this.searchTerm.nativeElement.value='';
  this.shopPrams=new shopParams();
  this.getProducts();
}
}
