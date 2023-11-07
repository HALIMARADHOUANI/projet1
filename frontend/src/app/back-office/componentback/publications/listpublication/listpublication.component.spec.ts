import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpublicationComponent } from './listpublication.component';

describe('ListpublicationComponent', () => {
  let component: ListpublicationComponent;
  let fixture: ComponentFixture<ListpublicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListpublicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListpublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
