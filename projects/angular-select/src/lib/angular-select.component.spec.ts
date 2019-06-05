import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularSelectComponent } from './angular-select.component';

describe('AngularSelectComponent', () => {
  let component: AngularSelectComponent;
  let fixture: ComponentFixture<AngularSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
