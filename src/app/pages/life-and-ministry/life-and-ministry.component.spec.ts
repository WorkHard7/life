import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeAndMinistryComponent } from './life-and-ministry.component';

describe('LifeAndMinistryComponent', () => {
  let component: LifeAndMinistryComponent;
  let fixture: ComponentFixture<LifeAndMinistryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LifeAndMinistryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LifeAndMinistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
