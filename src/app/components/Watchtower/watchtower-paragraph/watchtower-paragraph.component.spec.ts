import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchtowerParagraphComponent } from './watchtower-paragraph.component';

describe('WatchtowerParagraphComponent', () => {
  let component: WatchtowerParagraphComponent;
  let fixture: ComponentFixture<WatchtowerParagraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchtowerParagraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchtowerParagraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
