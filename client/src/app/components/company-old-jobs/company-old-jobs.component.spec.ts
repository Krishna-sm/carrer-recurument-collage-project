import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyOldJobsComponent } from './company-old-jobs.component';

describe('CompanyOldJobsComponent', () => {
  let component: CompanyOldJobsComponent;
  let fixture: ComponentFixture<CompanyOldJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyOldJobsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyOldJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
