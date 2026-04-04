const url = 'https://69cc26790b417a19e07be0d9.mockapi.io/user/produtos';
const main = document.querySelector('main');
const modal = document.querySelector('.modal-edicao');


function carregarProdutos() {
    fetch(url)
        .then(response => response.json())
        .then(dados => {
            exibirProdutos(dados);
        })
}

carregarProdutos();

function exibirProdutos(dados) {
    const tabela = document.createElement('table');
    const thead = document.createElement('thead');
    const linhaCabecalho = document.createElement('tr');

    const colunas = [
        "ID",
        "Produto",
        "Preço (R$)",
        "Estoque",
        "Descrição",
        "Ações"
    ];

    colunas.forEach((texto) => {
        const th = document.createElement('th');
        th.textContent = texto;
        linhaCabecalho.appendChild(th);
    });

    thead.appendChild(linhaCabecalho);
    tabela.appendChild(thead);

    const tbody = document.createElement('tbody');

    const chaves = [
        "id",
        "produto",
        "preco",
        "estoque",
        "descricao"
    ];

    dados.forEach((produto) => {
        const linha = document.createElement('tr');
        
        chaves.forEach((chave) => {
            const td = document.createElement('td');
            td.textContent = produto[chave];
            linha.appendChild(td);
        })
        
        const divBotoes = document.createElement('div');
        divBotoes.classList = 'botoes';

        const tdAcoes = document.createElement('td');
        tdAcoes.classList = 'td-acoes'
        tdAcoes.appendChild(divBotoes);
        linha.appendChild(tdAcoes);

        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'EXCLUIR';
        btnExcluir.classList= 'btn-excluir';
        divBotoes.appendChild(btnExcluir);

        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'EDITAR';
        btnEditar.classList = 'btn-editar';
        divBotoes.appendChild(btnEditar);

        btnEditar.addEventListener('click', () => {
            modal.showModal();

            const formModal = document.querySelector('.form-modal');
            const btnCancelarModal = document.querySelector('.btn-cancelar');
            const btnSalvarModal = document.querySelector('.btn-salvar');

            formModal.produto.value = produto.produto;
            formModal.preco.value = produto.preco;
            formModal.estoque.value = produto.estoque;
            formModal.descricao.value = produto.descricao;

            btnCancelarModal.addEventListener('click', () => {
                modal.close();
            })

            btnSalvarModal.addEventListener('click', (e) => {
                e.preventDefault();

                const urlModal = `https://69cc26790b417a19e07be0d9.mockapi.io/user/produtos/${produto.id}`;

                const formDados = new FormData(formModal);
                const dadosAlterados = Object.fromEntries(formDados);

                fetch(urlModal, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(dadosAlterados)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Erro HTTP: ${response.status}`);
                    }
                    return response.json();
                })
                .then(() => {
                    main.innerHTML = '';
                    modal.close();
                    carregarProdutos();
                })
            })
        })

        btnExcluir.addEventListener('click', () => {
            const urlExcluir = `https://69cc26790b417a19e07be0d9.mockapi.io/user/produtos/${produto.id}`;
            
            const confirma = confirm('Deseja excluir o produto?');

            if (!confirma) return; 

            fetch(urlExcluir, {
                method: "DELETE"
            })
            .then(response => response.json())
            .then(() => {
                main.innerHTML = '';
                carregarProdutos();
            })
        })

        tbody.appendChild(linha);
    })

    tabela.appendChild(tbody);

    main.appendChild(tabela); 
}

// Busca por ID

const inputPesquisaId = document.querySelector('#input-pesquisa');
const btnPesquisaId = document.querySelector('#btn-buscar');

btnPesquisaId.addEventListener('click', () => {
    const urlId = `https://69cc26790b417a19e07be0d9.mockapi.io/user/produtos/${inputPesquisaId.value}`

    fetch(urlId)
        .then(response => {
            if(!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            return response.json(); 
        })  
        .then(dados => {
            const listaProduto = [];
            listaProduto.push(dados);

            main.innerHTML = '';
            exibirProdutos(listaProduto);
            inputPesquisaId.value = '';
        })
        .catch(erro => {
            console.error(erro);
            alert('Produto não encontrado!');
            inputPesquisaId.value = '';
        })

})