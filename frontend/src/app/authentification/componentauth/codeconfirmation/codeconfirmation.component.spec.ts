import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeconfirmationComponent } from './codeconfirmation.component';

describe('CodeconfirmationComponent', () => {
  let component: CodeconfirmationComponent;
  let fixture: ComponentFixture<CodeconfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeconfirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeconfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
