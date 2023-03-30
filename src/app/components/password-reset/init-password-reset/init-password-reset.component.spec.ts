import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitPasswordResetComponent } from './init-password-reset.component';

describe('InitPasswordResetComponent', () => {
  let component: InitPasswordResetComponent;
  let fixture: ComponentFixture<InitPasswordResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitPasswordResetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitPasswordResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
