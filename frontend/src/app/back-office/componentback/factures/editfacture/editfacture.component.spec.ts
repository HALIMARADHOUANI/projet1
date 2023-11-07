import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditfactureComponent } from './editfacture.component';

describe('EditfactureComponent', () => {
  let component: EditfactureComponent;
  let fixture: ComponentFixture<EditfactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditfactureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditfactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
