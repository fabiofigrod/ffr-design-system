import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FfrDesignComponent } from './ffr-design.component';

describe('FfrDesignComponent', () => {
  let component: FfrDesignComponent;
  let fixture: ComponentFixture<FfrDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FfrDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FfrDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
