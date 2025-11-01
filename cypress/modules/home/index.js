
class home {

    realizarScrollParaFinalDaPagina() {

        cy.get('footer').scrollIntoView()
    }

    informarEmailSubscriptionEEenviar(email) {

        cy.get('input[id="susbscribe_email"]').type(email)
        cy.get('button[id="subscribe"]').click()
    }



}

export default new home()