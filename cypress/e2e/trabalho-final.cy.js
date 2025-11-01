/// <reference types="cypress"/>

import menu from "../modules/menu"
import login from "../modules/login"
import cadastro from "../modules/cadastro"
import contactUs from "../modules/contactUs"
import produto from "../modules/produto"
import home from "../modules/home"
import carrinho from "../modules/carrinho"
import checkout from "../modules/checkout"
import pagamento from "../modules/pagamento"

import utils from "../support/helpers"

import userData from "../fixtures/dadosParaTestes.json"

describe('Tests Cases - plataforma Automation Exercices', () => {

    beforeEach(() => {
        cy.visit('https://automationexercise.com');
        menu.navegarParaLogin()
    });

    it('Cadastrar um usuário - test case 1', () => {


        //preencher o formulário de pré cadastro
        login.preencherFormularioDePreCadastro(utils.gerarNome(), utils.gerarEmail())

        //valida que está na tela de informações da conta
        expect(cy.get('b').contains('Enter Account Information')).to.exist

        // preencher formulário cadastro completo
        cadastro.preencherFormularioDeCadastroCompleto()

        // asserção para validar que foi realizado o cadastro com sucesso      
        cy.url().should('includes', 'account_created')
        cy.contains('b', 'Account Created!')

    });

    it('Login de Usuário com e-mail e senha corretos - test case 2', () => {

        login.preencherFormularioDeLogin(userData.user, userData.pass)

        cy.get('i.fa-user').parent().should('contain', userData.name)
        cy.get('a[href="/logout"]').should('be.visible')

    });

    it('Login de Usuário com e-mail e senha incorretos - test case 3', () => {

        login.preencherFormularioDeLogin(userData.user, '44555')

        cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!')

    });


    it('Logout de Usuário - test case 4', () => {

        login.preencherFormularioDeLogin(userData.user, userData.pass)

        menu.efetuarLogout()

        cy.get('a[href="/login"]').should('have.text', ' Signup / Login')
        cy.url().should('contain', 'login')

    });


    it('Tentar registrar com e-mail já existente - test case 5', () => {

        login.preencherFormularioDePreCadastro(userData.name, userData.emailExistente)

        cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!')
    });


    it('Acessar formulário contact us - test case 6', () => {

        menu.navegarParaConctactUS()
        contactUs.preencherFormularioContactUs()

        cy.get('.status').should('be.visible')
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')
    })

    it('Verificar todos os produtos e página de detalhes - test case 8', () => {
        menu.navegarParaProdutos()

        cy.contains('All Products')
        cy.get('div[class=features_items]').should('be.visible')

        produto.selecionarPrimeiroProdutoDaLista()

        cy.url().should('contain', 'product_details')
        cy.get('div[class="product-information"]').should('be.visible')

    })

    it('Pesquisa de produto - test case 9', () => {

        menu.navegarParaProdutos()

        cy.contains('All Products')
        cy.get('div[class=features_items]').should('be.visible')

        produto.pesquisarProduto(userData.nameProduct)

        cy.get('h2.title').should('have.text', 'Searched Products')
        cy.get('div.productinfo').should('be.visible')
        cy.get('div[class="overlay-content"] > p').should('have.text', userData.nameProduct)
    });

    it('Verifica a assinatura na página inicial - test case 10', () => {

        menu.navegarParaHome()
        cy.get('li > a[href="/"]').should('have.css', 'color', 'rgb(255, 165, 0)')

        home.realizarScrollParaFinalDaPagina()
        cy.get('.single-widget > h2').should('have.text', 'Subscription')

        home.informarEmailSubscriptionEEenviar(userData.email)
        cy.get('div.alert-success')
            .should('be.visible')
            .and('contain', 'You have been successfully subscribed!')

    })

    it('Realizando pedido, cadastrando-se antes de finalizar a compra - test case 15', () => {

        const nome = utils.gerarNome()

        login.preencherFormularioDePreCadastro(nome, utils.gerarEmail())

        expect(cy.get('b').contains('Enter Account Information')).to.exist

        cadastro.preencherFormularioDeCadastroCompleto()

        cy.url().should('includes', 'account_created')
        cy.contains('b', 'Account Created!')

        cadastro.acionandoBotaoContinueCadastroCriado()

        cy.get('a > b').should('have.text', nome)

        //adicionando produtos no carrinho
        carrinho.adicionarProdutoNoCarrinho(1)
        carrinho.adicionarProdutoNoCarrinho(2)

        //acessando menu carrinho
        menu.navegarParaCarrinho()

        cy.get('a.btn').should('have.text', 'Proceed To Checkout')
        cy.get('.table#cart_info_table').children().should('have.length', 2)


        carrinho.clicandoEmFinalizarCompra()

        //valida address
        cy.get('#address_delivery').should('be.visible')
        cy.get('#address_delivery')
            .children().contains('4199 Canal street test')
        cy.get('#address_delivery')
            .children().contains('Canada')

        // cy.get('div #cart_info .table tbody').children().should('have.length',2)

        cy.get('div #cart_info .table tbody')
            .children()
            .should('contain.text', 'Men Tshirt')
            .and('contain.text', 'Blue Top')

        //realizando pedido
        checkout.realizandoPedido()

        cy.get('h2').contains('Payment')

        pagamento.realizarPagamento()

        cy.contains('Congratulations! Your order has been confirmed!')
    })
});