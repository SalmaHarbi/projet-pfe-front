import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesEmployeeComponent } from './expenses-employee.component';

describe('ExpensesEmployeeComponent', () => {
  let component: ExpensesEmployeeComponent;
  let fixture: ComponentFixture<ExpensesEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensesEmployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpensesEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
