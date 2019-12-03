import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUkmComponent } from './update-ukm.component';

describe('UpdateUkmComponent', () => {
  let component: UpdateUkmComponent;
  let fixture: ComponentFixture<UpdateUkmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateUkmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUkmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
