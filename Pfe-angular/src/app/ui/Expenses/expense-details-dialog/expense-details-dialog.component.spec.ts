import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseDetailsDialogComponent } from './expense-details-dialog.component';

describe('ExpenseDetailsDialogComponent', () => {
  let component: ExpenseDetailsDialogComponent;
  let fixture: ComponentFixture<ExpenseDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
