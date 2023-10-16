import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillSetComponent } from './skill-set.component';

describe('SkillSetComponent', () => {
  let component: SkillSetComponent;
  let fixture: ComponentFixture<SkillSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillSetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
