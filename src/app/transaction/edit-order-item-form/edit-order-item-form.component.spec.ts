import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrderItemFormComponent } from './edit-order-item-form.component';

describe('EditOrderItemFormComponent', () => {
  let component: EditOrderItemFormComponent;
  let fixture: ComponentFixture<EditOrderItemFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOrderItemFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrderItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
