import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilKelompokComponent } from './profil-kelompok.component';

describe('ProfilKelompokComponent', () => {
  let component: ProfilKelompokComponent;
  let fixture: ComponentFixture<ProfilKelompokComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilKelompokComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilKelompokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
