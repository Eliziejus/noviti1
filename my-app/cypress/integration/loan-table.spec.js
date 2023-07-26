describe('LoanTableComponent', () => {
    beforeEach(() => {
      cy.visit('/information');
    });
  
    it('should generate loan schedule for valid inputs', () => {
      // Fill in the form inputs
      cy.get('#loanAmount').type('20000');
      cy.get('#yearlyInterest').type('12');
      cy.get('#term').type('12');
      cy.get('#repaymentType').select('annuity');
  
      // Submit the form
      cy.get('form').submit();
  
      // Check if the loan schedule table is displayed
      cy.get('.loan-schedule-table').should('be.visible');
  
      // Check the number of rows in the loan schedule table
      cy.get('.loan-schedule-table table tbody tr').should('have.length', 13); // Header row + 12 loan schedule rows
  
      // Check the first row (header) contains the correct column headers
      cy.get('.loan-schedule-table table thead tr th').should('have.length', 5); // 5 columns in the header
      cy.get('.loan-schedule-table table thead tr th').eq(0).should('contain', 'Month');
      cy.get('.loan-schedule-table table thead tr th').eq(1).should('contain', 'Remaining Amount (EUR)');
      cy.get('.loan-schedule-table table thead tr th').eq(2).should('contain', 'Interest Payment (EUR)');
      cy.get('.loan-schedule-table table thead tr th').eq(3).should('contain', 'Principal Payment (EUR)');
      cy.get('.loan-schedule-table table thead tr th').eq(4).should('contain', 'Total Payment (EUR)');
  
      // Check the last row contains the expected total remaining amount (0.00)
      cy.get('.loan-schedule-table table tbody tr').eq(-1).find('td').eq(1).should('contain', '0.00');
    });
  });