import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseWindowComponent } from './database.window.component';

describe('DatabaseWindowComponent', () => {
  let component: DatabaseWindowComponent;
  let fixture: ComponentFixture<DatabaseWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatabaseWindowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatabaseWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
