import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetApiComponent } from './get-api.component';

describe('GetApiComponent', () => {
  let component: GetApiComponent;
  let fixture: ComponentFixture<GetApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
