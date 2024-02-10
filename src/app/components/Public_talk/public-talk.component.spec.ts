import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicTalkComponent } from './public-talk.component';

describe('PublicTalkComponent', () => {
  let component: PublicTalkComponent;
  let fixture: ComponentFixture<PublicTalkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicTalkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicTalkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
