import userData from "../fixtures/dadosParaTestes.json"
import { faker } from "@faker-js/faker"

class funcoesAuxiliares {

    gerarNome() {

        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()

        return `${firstName} ${lastName}`
    }

    gerarEmail() {

        return faker.internet.email({ firstName: userData.complementoEmail })
    }

    obterArquivoUpload() {
        
        return 'cypress/fixtures/133850691724312572.jpg'
    }

}

export default new funcoesAuxiliares()