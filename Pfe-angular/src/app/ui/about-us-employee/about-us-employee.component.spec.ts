import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsEmployeeComponent } from './about-us-employee.component';

describe('AboutUsEmployeeComponent', () => {
  let component: AboutUsEmployeeComponent;
  let fixture: ComponentFixture<AboutUsEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutUsEmployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutUsEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
