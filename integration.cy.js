describe('TodoMVC - React', () => {
  beforeEach(() => {
    // Visit the TodoMVC React example page before each test
    cy.visit('https://todomvc.com/examples/typescript-react/#/');
  });

  it('allows me to add a new todo', () => {
    const newItem = 'Test new todo item';

    // Enter a new to-do item and press enter
    cy.get('.new-todo').type(`${newItem}{enter}`);

    // Verify the new item has been added to the list
    cy.get('.todo-list li').should('have.length', 1);
    cy.get('.todo-list li').first().find('label').should('have.text', newItem);

    // Additional assertion to check the item is not completed by default
    cy.get('.todo-list li').first().should('not.have.class', 'completed');
  });
  
  it('allows me to view active todos', () => {
    // Add a few items
    cy.get('.new-todo').type('First item{enter}');
    cy.get('.new-todo').type('Second item{enter}');
    cy.get('.new-todo').type('Third item{enter}');

    // Mark the first item as completed
    cy.get('.todo-list li').first().find('.toggle').click();

    // Filter by active items
    cy.contains('Active').click();

    // Assert only two items are visible and match expected text
    cy.get('.todo-list li').should('have.length', 2);
    cy.get('.todo-list li').eq(0).find('label').should('have.text', 'Second item');
    cy.get('.todo-list li').eq(1).find('label').should('have.text', 'Third item');
  });
});