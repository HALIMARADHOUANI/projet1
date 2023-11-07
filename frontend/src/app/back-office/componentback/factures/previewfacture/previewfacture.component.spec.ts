import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewfactureComponent } from './previewfacture.component';

describe('PreviewfactureComponent', () => {
  let component: PreviewfactureComponent;
  let fixture: ComponentFixture<PreviewfactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewfactureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewfactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
