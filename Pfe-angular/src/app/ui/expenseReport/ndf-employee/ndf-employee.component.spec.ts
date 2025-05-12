import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NDFEmployeeComponent } from './ndf-employee.component';

describe('NDFEmployeeComponent', () => {
  let component: NDFEmployeeComponent;
  let fixture: ComponentFixture<NDFEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NDFEmployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NDFEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
