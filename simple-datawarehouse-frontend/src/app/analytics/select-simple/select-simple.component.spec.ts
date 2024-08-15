import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSimpleComponent } from './select-simple.component';

describe('SelectSimpleComponent', () => {
  let component: SelectSimpleComponent;
  let fixture: ComponentFixture<SelectSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectSimpleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
