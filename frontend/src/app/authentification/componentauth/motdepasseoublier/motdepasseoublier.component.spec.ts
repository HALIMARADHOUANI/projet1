import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotdepasseoublierComponent } from './motdepasseoublier.component';

describe('MotdepasseoublierComponent', () => {
  let component: MotdepasseoublierComponent;
  let fixture: ComponentFixture<MotdepasseoublierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotdepasseoublierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotdepasseoublierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
