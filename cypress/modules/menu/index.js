
class menu {

    navegarParaLogin() {

        cy.get('a[href="/login"]').click()
    }

    efetuarLogout() {

        cy.get('a[href="/logout"]').click()
    }

    navegarParaConctactUS() {

        cy.get('a[href="/contact_us"]').click()
    }

    navegarParaProdutos() {

        cy.get('a[href="/products"]').click()
    }

    navegarParaHome() {

        cy.get('li > a[href="/"]').click()
    }

    navegarParaCarrinho() {

        cy.get('ul a[href="/view_cart"]').click()

    }

}

export default new menu()