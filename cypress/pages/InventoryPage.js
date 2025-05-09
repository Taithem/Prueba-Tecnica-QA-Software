class InventoryPage {
    elements = {
        productSort: () => cy.get('[data-test="product-sort-container"]'),
        addToCartButtons: () => cy.get('[data-test^="add-to-cart"]'),
        shoppingCart: () => cy.get('.shopping_cart_link'),
        menuButton: () => cy.get('#react-burger-menu-btn'),
        logoutLink: () => cy.get('#logout_sidebar_link')
    }

    sortProducts(option) {
        this.elements.productSort().select(option);
    }

    addProductToCart(index) {
        this.elements.addToCartButtons().eq(index).click();
    }

    goToCart() {
        this.elements.shoppingCart().click();
    }

    logout() {
        this.elements.menuButton().click();
        cy.wait(1000); // Esperar a que el menú se abra
        this.elements.logoutLink().click();
    }
}

export default new InventoryPage();