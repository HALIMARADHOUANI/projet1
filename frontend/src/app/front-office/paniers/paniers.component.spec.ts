import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaniersComponent } from './paniers.component';

describe('PaniersComponent', () => {
  let component: PaniersComponent;
  let fixture: ComponentFixture<PaniersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaniersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaniersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
