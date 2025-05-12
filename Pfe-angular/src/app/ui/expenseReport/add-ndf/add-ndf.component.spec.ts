import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNdfComponent } from './add-ndf.component';

describe('AddNdfComponent', () => {
  let component: AddNdfComponent;
  let fixture: ComponentFixture<AddNdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNdfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
