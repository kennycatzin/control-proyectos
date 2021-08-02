import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CompromisosComponent } from './compromisos.component';

describe('CompromisosComponent', () => {
  let component: CompromisosComponent;
  let fixture: ComponentFixture<CompromisosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CompromisosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompromisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
