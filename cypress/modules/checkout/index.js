import userData from "../../fixtures/dadosParaTestes.json"


class checkout{

    realizandoPedido(){

        cy.get('.form-control').type(userData.message)
        cy.get('a[href="/payment"]').click()
    }
}

export default new checkout()