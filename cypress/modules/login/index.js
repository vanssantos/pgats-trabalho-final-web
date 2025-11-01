
class login {

    preencherFormularioDePreCadastro(name, email){
     
        cy.get('[data-qa="signup-name"]').type(name)
        cy.get('[data-qa="signup-email"]').type(email)

        cy.contains('button', 'Signup').click()
    }  
   

    preencherFormularioDeLogin(usuario, senha) {

        cy.get('input[data-qa="login-email"]').type(usuario)
        cy.get('input[data-qa="login-password"]').type(senha)

        cy.get('button[data-qa="login-button"]').click()
    }

}

export default new login()

