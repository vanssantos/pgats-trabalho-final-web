
import formDados from "../../fixtures/dadosParaTestes.json"
import utils from "../../support/helpers"

class contactUs {

    preencherFormularioContactUs() {

        cy.get('input[data-qa="name"]').type(formDados.name)
        cy.get('input[data-qa="email"]').type(formDados.email)
        cy.get('input[data-qa="subject"]').type(formDados.subject)
        cy.get('textarea[data-qa="message"]').type(formDados.message)

        //anexando arquivo
        cy.get('input[name="upload_file"]').selectFile(utils.obterArquivoUpload())   
        
        cy.get('input[data-qa="submit-button"]').click()
    }
}

export default new contactUs()