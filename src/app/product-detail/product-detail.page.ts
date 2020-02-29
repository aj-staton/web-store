import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  currentProduct = null;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.currentProduct = this.route.snapshot.params;
  }

  placeOrder() {
    // Write to the DB.
    this.router.navigate(['/tabs/product-list']);
  }
  
}
