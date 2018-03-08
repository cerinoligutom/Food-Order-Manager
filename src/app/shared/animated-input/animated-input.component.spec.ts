import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FomComponent } from './animated-input.component';

describe('AnimatedInputComponent', () => {
  let component: FomComponent;
  let fixture: ComponentFixture<FomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
