import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCommentairesComponent } from './list-comments.component';

describe('ListcommentaireComponent', () => {
  let component: ListeCommentairesComponent;
  let fixture: ComponentFixture<ListeCommentairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeCommentairesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeCommentairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
