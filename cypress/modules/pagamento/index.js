
import userData from "../../fixtures/dadosParaTestes.json"

class pagamento {

    realizarPagamento() {

        cy.get('[data-qa="name-on-card"]').type(userData.nomeCartao)
        cy.get('[data-qa="card-number"]').type(userData.numeroCartao)
        cy.get('[data-qa="cvc"]').type(userData.cvv)
        cy.get('[data-qa="expiry-month"]').type(userData.mesExpiracao)
        cy.get('[data-qa="expiry-year"]').type(userData.anoExpiracao)
        cy.get('[data-qa="pay-button"]').click()
    }

}

export default new pagamento()