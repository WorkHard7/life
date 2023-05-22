import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartBtnComponent } from './start-btn.component';

describe('StartBtnComponent', () => {
  let component: StartBtnComponent;
  let fixture: ComponentFixture<StartBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
