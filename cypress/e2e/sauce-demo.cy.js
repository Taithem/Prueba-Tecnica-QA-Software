import { faker } from '@faker-js/faker';
import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';

describe('Sauce Demo Tests', () => {
    // Datos de prueba
    const validUser = 'standard_user';
    const validPassword = 'secret_sauce';
    
    beforeEach(() => {
        LoginPage.visit();
    });

    it('should login successfully with valid credentials', () => {
        LoginPage.login(validUser, validPassword);
        cy.url().should('include', '/inventory.html');
    });

    it('should show error with invalid credentials', () => {
        LoginPage.login('invalid_user', 'invalid_password');
        LoginPage.elements.errorMessage().should('be.visible');
    });

    it('should filter products and add to cart', () => {
        cy.login(validUser, validPassword);
        InventoryPage.sortProducts('za');
        InventoryPage.addProductToCart(0);
        InventoryPage.addProductToCart(1);
        InventoryPage.goToCart();
        cy.url().should('include', '/cart.html');
    });

    it('should complete checkout process', () => {
        cy.login(validUser, validPassword);
        InventoryPage.addProductToCart(0);
        InventoryPage.goToCart();
        cy.get('[data-test="checkout"]').click();
        
        // faker para datos dinámicos
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const zipCode = faker.location.zipCode();
        
        cy.completeCheckout(firstName, lastName, zipCode);
        cy.get('[data-test="finish"]').click();
        cy.get('.complete-header').should('contain', 'Thank you for your order');
    });

    it('should logout successfully', () => {
        cy.login(validUser, validPassword);
        InventoryPage.logout();
        cy.url().should('eq', 'https://www.saucedemo.com/');
    });
});