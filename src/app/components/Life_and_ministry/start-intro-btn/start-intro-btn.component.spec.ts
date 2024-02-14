import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartIntroBtnComponent } from './start-intro-btn.component';

describe('StartIntroBtnComponent', () => {
  let component: StartIntroBtnComponent;
  let fixture: ComponentFixture<StartIntroBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartIntroBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartIntroBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
