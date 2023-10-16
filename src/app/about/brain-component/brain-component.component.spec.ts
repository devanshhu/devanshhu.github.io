import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrainComponentComponent } from './brain-component.component';

describe('BrainComponentComponent', () => {
  let component: BrainComponentComponent;
  let fixture: ComponentFixture<BrainComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrainComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrainComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
