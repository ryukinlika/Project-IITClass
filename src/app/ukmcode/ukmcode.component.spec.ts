import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UkmcodeComponent } from './ukmcode.component';

describe('UkmcodeComponent', () => {
  let component: UkmcodeComponent;
  let fixture: ComponentFixture<UkmcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UkmcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UkmcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
