import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtractPopupComponent } from './extract-popup.component';

describe('ExtractPopupComponent', () => {
  let component: ExtractPopupComponent;
  let fixture: ComponentFixture<ExtractPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtractPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExtractPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
