describe('LoanTableComponent', () => {
    beforeEach(() => {
      cy.visit('http://localhost:54908/information');
    });
  
    it('should generate loan schedule for valid inputs', () => {
      cy.get('#loanAmount').type('20000');
      cy.get('#yearlyInterest').type('12');
      cy.get('#term').type('12');
      cy.get('#repaymentType').select('annuity');
  
      cy.get('form').submit();
  
      cy.get('.loan-schedule-table').should('be.visible');
  
      cy.get('.loan-schedule-table table tbody tr').should('have.length', 13);
  
      cy.get('.loan-schedule-table table thead tr th').should('have.length', 5);
      cy.get('.loan-schedule-table table thead tr th').eq(0).should('contain', 'Month');
      cy.get('.loan-schedule-table table thead tr th').eq(1).should('contain', 'Remaining Amount (EUR)');
      cy.get('.loan-schedule-table table thead tr th').eq(2).should('contain', 'Interest Payment (EUR)');
      cy.get('.loan-schedule-table table thead tr th').eq(3).should('contain', 'Principal Payment (EUR)');
      cy.get('.loan-schedule-table table thead tr th').eq(4).should('contain', 'Total Payment (EUR)');
  
      cy.get('.loan-schedule-table table tbody tr').eq(-1).find('td').eq(1).should('contain', '0.00');
    });
  });