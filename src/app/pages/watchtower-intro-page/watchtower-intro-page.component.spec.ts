import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchtowerIntroPageComponent } from './watchtower-intro-page.component';

describe('WatchtowerIntroPageComponent', () => {
  let component: WatchtowerIntroPageComponent;
  let fixture: ComponentFixture<WatchtowerIntroPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchtowerIntroPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchtowerIntroPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
