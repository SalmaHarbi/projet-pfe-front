import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNdfComponent } from './edit-ndf.component';

describe('EditNdfComponent', () => {
  let component: EditNdfComponent;
  let fixture: ComponentFixture<EditNdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditNdfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditNdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
