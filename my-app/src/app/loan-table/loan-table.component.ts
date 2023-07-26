import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface LoanScheduleEntry {
  month: number;
  remainingAmount: number;
  interestPayment: number;
  principalPayment: number;
  totalPayment: number;
  totalInterest: number;
  totalPrincipal: number;
  totalPayments: number; 
}

@Component({
  selector: 'app-loan-table',
  templateUrl: './loan-table.component.html',
  styleUrls: ['./loan-table.component.scss']
})
export class LoanTableComponent implements OnInit {
  loanForm!: FormGroup;
  loanSchedule: LoanScheduleEntry[] = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loanForm = this.formBuilder.group({
      loanAmount: [null, [Validators.required, Validators.min(5000), Validators.max(50000)]],
      yearlyInterest: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
      term: [null, [Validators.required, Validators.min(1), Validators.max(120)]],
      repaymentType: ['', Validators.required]
    });
  }

  generateLoanSchedule(event: Event) {
    event.preventDefault();

    if (this.loanForm.invalid) {
      this.loanForm.markAllAsTouched();
      return;
    }

    const monthlyInterest = this.loanForm.value.yearlyInterest / 12;
    const monthlyPayment = this.calculateMonthlyPayment(
      this.loanForm.value.loanAmount,
      monthlyInterest,
      this.loanForm.value.term
    );
    this.loanSchedule = this.generateLoanScheduleEntries(
      this.loanForm.value.loanAmount,
      monthlyInterest,
      this.loanForm.value.term,
      monthlyPayment,
      this.loanForm.value.repaymentType
    );
    localStorage.setItem('loanSchedule', JSON.stringify(this.loanSchedule));
  
    }

  private calculateMonthlyPayment(principal: number, interestRate: number, months: number): number {
    return (
      principal * interestRate * Math.pow(1 + interestRate, months) /
      (Math.pow(1 + interestRate, months) - 1)
    );
  }

  private generateLoanScheduleEntries(
    loanAmount: number,
    monthlyInterest: number,
    term: number,
    monthlyPayment: number,
    repaymentType: string,
    totalInterest = 0,
    totalPrincipal = 0,
    totalPayments = 0,

  ): LoanScheduleEntry[] {
    const schedule: LoanScheduleEntry[] = [];
    let remainingAmount = loanAmount;

    for (let month = 1; month <= term; month++) {
      const interestPayment = remainingAmount * monthlyInterest;
      const principalPayment = repaymentType === 'annuity' ? monthlyPayment - interestPayment : loanAmount / term;
      const totalPayment = principalPayment + interestPayment;
      totalInterest += interestPayment;
      totalPrincipal += principalPayment;
      totalPayments += totalPayment;

      schedule.push({
        month,
        remainingAmount,
        interestPayment,
        principalPayment,
        totalPayment,
        totalInterest,
        totalPrincipal,
        totalPayments,
      });

      remainingAmount -= principalPayment;
    }

    return schedule;
  }

}
