import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableInfoDialogComponent } from './table-info-dialog.component';

describe('TableInfoDialogComponent', () => {
  let component: TableInfoDialogComponent;
  let fixture: ComponentFixture<TableInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableInfoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
