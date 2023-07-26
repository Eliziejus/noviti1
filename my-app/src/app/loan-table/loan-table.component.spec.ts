import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { LoanTableComponent } from './loan-table.component';

describe('LoanTableComponent', () => {
  let component: LoanTableComponent;
  let fixture: ComponentFixture<LoanTableComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoanTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanTableComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form with missing fields', () => {
    expect(component.loanForm.invalid).toBeTruthy();
  expect(component.loanForm.get('loanAmount')?.errors?.['required']).toBeTruthy();
  expect(component.loanForm.get('yearlyInterest')?.errors?.['required']).toBeTruthy();
  expect(component.loanForm.get('term')?.errors?.['required']).toBeTruthy();
  expect(component.loanForm.get('repaymentType')?.errors?.['required']).toBeTruthy();
  });

  it('should have a valid form with correct values', () => {
    component.loanForm.patchValue({
      loanAmount: 10000,
      yearlyInterest: 10,
      term: 6,
      repaymentType: 'annuity',
    });

    expect(component.loanForm.valid).toBeTruthy();
  });

  it('should show validation error for invalid loan amount', waitForAsync(async () => {
    component.loanForm.patchValue({
      loanAmount: 1000, // Set an invalid loan amount
    });

    component.generateLoanSchedule(new Event('click'));

    await fixture.whenStable(); // Wait for asynchronous operations to complete

    fixture.detectChanges(); // Detect changes after waiting for stable state

    const validationError = fixture.nativeElement.querySelector('.text-red-500');

    expect(validationError.textContent).toEqual(" Loan amount must be between 5000 and 50000 EUR. ");
  }));
});