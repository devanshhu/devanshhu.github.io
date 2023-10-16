import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaptopMapComponent } from './laptop-map.component';

describe('LaptopMapComponent', () => {
  let component: LaptopMapComponent;
  let fixture: ComponentFixture<LaptopMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaptopMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaptopMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
