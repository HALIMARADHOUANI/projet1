import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteproduitComponent } from './deleteproduit.component';

describe('DeleteproduitComponent', () => {
  let component: DeleteproduitComponent;
  let fixture: ComponentFixture<DeleteproduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteproduitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteproduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
