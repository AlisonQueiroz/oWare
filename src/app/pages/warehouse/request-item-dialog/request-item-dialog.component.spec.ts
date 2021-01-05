import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestItemDialogComponent } from './request-item-dialog.component';

describe('RequestItemDialogComponent', () => {
  let component: RequestItemDialogComponent;
  let fixture: ComponentFixture<RequestItemDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestItemDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
