import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliteButtonComponent } from './elite-button.component';

describe('EliteButtonComponent', () => {
  let component: EliteButtonComponent;
  let fixture: ComponentFixture<EliteButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliteButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliteButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
