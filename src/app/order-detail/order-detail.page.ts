import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {

  currentOrder = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.currentOrder = this.route.snapshot.params;
  }
  
}
