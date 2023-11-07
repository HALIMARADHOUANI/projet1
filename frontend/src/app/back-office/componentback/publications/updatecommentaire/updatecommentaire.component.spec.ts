import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecommentaireComponent } from './updatecommentaire.component';

describe('UpdatecommentaireComponent', () => {
  let component: UpdatecommentaireComponent;
  let fixture: ComponentFixture<UpdatecommentaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatecommentaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatecommentaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
