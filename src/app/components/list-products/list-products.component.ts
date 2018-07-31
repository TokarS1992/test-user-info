import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  @Input() listProductsUser: Product[] = [];
  constructor() { }

  ngOnInit() {
  }

}
