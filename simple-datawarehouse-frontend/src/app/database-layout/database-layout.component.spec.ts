import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DatabaseLayoutComponent} from './database-layout.component';

describe('DatabaseLayoutComponent', () => {
  let component: DatabaseLayoutComponent;
  let fixture: ComponentFixture<DatabaseLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatabaseLayoutComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DatabaseLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
