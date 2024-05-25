import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DatasourceWindowComponent} from './datasource-window.component';

describe('DatabaseWindowComponent', () => {
  let component: DatasourceWindowComponent;
  let fixture: ComponentFixture<DatasourceWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatasourceWindowComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DatasourceWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
