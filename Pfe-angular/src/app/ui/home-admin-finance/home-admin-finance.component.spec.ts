import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAdminFinanceComponent } from './home-admin-finance.component';

describe('HomeAdminFinanceComponent', () => {
  let component: HomeAdminFinanceComponent;
  let fixture: ComponentFixture<HomeAdminFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeAdminFinanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeAdminFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
