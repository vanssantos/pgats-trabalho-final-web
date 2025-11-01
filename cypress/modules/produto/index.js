
class produto {

    selecionarPrimeiroProdutoDaLista() {

        cy.get('a[href="/product_details/1"]').click()
    }

    pesquisarProduto(nameProduct){

        cy.get('input[id="search_product"]').type(nameProduct)
        cy.get('button[id="submit_search"]').click()
    } 

}

export default new produto()