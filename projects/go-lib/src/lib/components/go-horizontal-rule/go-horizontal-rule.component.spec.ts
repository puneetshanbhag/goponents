import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoHorizontalRuleComponent } from './go-horizontal-rule.component';

describe('GoHorizontalRuleComponent', () => {
  let component: GoHorizontalRuleComponent;
  let fixture: ComponentFixture<GoHorizontalRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoHorizontalRuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoHorizontalRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
