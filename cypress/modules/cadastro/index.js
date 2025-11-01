
import { faker } from "@faker-js/faker"
import userData from "../../fixtures/dadosParaTestes.json"

class cadrastro {

    preencherFormularioDeCadastroCompleto() {

        // radio ou checkbox  ->  check
        cy.get('input[type=radio]').check('Mrs')

        cy.get('#password').type('12345', { log: false }) //log: false, esconde a senha, não exibe nos passos de execução do cypress

        // para combobox ou selects
        cy.get('[data-qa=days]').select('20')
        cy.get('[data-qa=months]').select('September')
        cy.get('[data-qa=years]').select('1983')

        // radio ou checkbox  ->  check
        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()


        // usando dados do faker para preenhcer o formulário
        cy.get('input#first_name').type(faker.person.firstName())
        cy.get('input#last_name').type(faker.person.lastName())
        cy.get('input#company').type(faker.company.name())
        //cy.get('input#address1').type(faker.location.streetAddress())
        cy.get('input#address1').type(userData.address)
        cy.get('select#country').select('Canada')
        cy.get('input#state').type(faker.location.state())
        cy.get('input#city').type(faker.location.city())
        cy.get('input#zipcode').type(faker.location.zipCode())
        cy.get('input#mobile_number').type('111 222 333')

        cy.get('[data-qa="create-account"]').click()
    }


    acionandoBotaoContinueCadastroCriado() {

        cy.get('a[data-qa="continue-button"]').click()
        
    }


}

export default new cadrastro()