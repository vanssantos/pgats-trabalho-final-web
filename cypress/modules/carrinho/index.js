
class carrinho {

    adicionarProdutoNoCarrinho(idProduto) {

        cy.get(`.features_items .product-image-wrapper .productinfo a[data-product-id=${idProduto}]`).click()
        cy.get('h4.modal-title').should('have.text', 'Added!')
        cy.get('.modal-footer > .btn').click()
    }

    clicandoEmFinalizarCompra() {
        cy.get('a.btn')
        .contains('Proceed To Checkout')
        .click()
    }



}

export default new carrinho()