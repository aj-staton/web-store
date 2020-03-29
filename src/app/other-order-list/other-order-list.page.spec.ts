import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OtherOrderListPage } from './other-order-list.page';

describe('OtherOrderListPage', () => {
  let component: OtherOrderListPage;
  let fixture: ComponentFixture<OtherOrderListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherOrderListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OtherOrderListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
