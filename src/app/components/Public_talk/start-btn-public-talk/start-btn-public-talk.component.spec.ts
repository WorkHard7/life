import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartBtnPublicTalkComponent } from './start-btn-public-talk.component';

describe('StartBtnPublicTalkComponent', () => {
  let component: StartBtnPublicTalkComponent;
  let fixture: ComponentFixture<StartBtnPublicTalkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartBtnPublicTalkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartBtnPublicTalkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
