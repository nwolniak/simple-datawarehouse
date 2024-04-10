import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtlComponent } from './etl.component';

describe('EtlComponent', () => {
  let component: EtlComponent;
  let fixture: ComponentFixture<EtlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EtlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
