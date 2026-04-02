const url = 'https://69cc26790b417a19e07be0d9.mockapi.io/user/users';
const main = document.querySelector('main');
// Buscando os dados da API com fetch

function carregarUsuarios() {
    fetch(url)
    .then(response => response.json())
    .then(dados => {
        exibirDados(dados);
    });
}

carregarUsuarios();

function exibirDados(dados) {
    // Cria a tabela
    const tabela = document.createElement('table');
    
    // Cabeçalho da tabela
    const thead = document.createElement('thead');
    const linhaCabecalho = document.createElement('tr');

    const colunas = [
        "ID", 
        "Nome", 
        "Email", 
        "Cep", 
        "Logradouro", 
        "Numero", 
        "Complemento", 
        "Bairro", 
        "Cidade", 
        "UF",
        "Ações"
    ];

    colunas.forEach((texto) => {
        const th = document.createElement('th');
        th.textContent = texto;
        linhaCabecalho.appendChild(th);
    });

    thead.appendChild(linhaCabecalho);
    tabela.appendChild(thead);

    // CORPO (body)
    const tbody = document.createElement('tbody');

    // Chaves do objeto na mesma ordem das colunas
    const chaves = [
        "id", 
        "nome", 
        "email", 
        "cep", 
        "logradouro", 
        "numero", 
        "complemento", 
        "bairro", 
        "cidade", 
        "uf"
    ];

    dados.forEach((usuario) => {
        const linha = document.createElement('tr');

        chaves.forEach((chave) => {
            const td = document.createElement('td');
            td.textContent = usuario[chave];
            linha.appendChild(td);
        })

        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'EXCLUIR';
        btnExcluir.classList= 'btn-excluir';
        linha.appendChild(btnExcluir);

        btnExcluir.addEventListener('click', () => {
            const urlExcluir = `https://69cc26790b417a19e07be0d9.mockapi.io/user/users/${usuario.id}`;

            const confirma = confirm('Deseja excluir o usuário?')

            if (!confirma) return;

            fetch(urlExcluir, {
                method: "DELETE"
            })
            .then(response => response.json())
            .then(() => {
                main.innerHTML = '';
                carregarUsuarios()
            })
        })

        tbody.appendChild(linha);
    })

    tabela.appendChild(tbody);

    // Insere a tabela no main
    main.appendChild(tabela);
}



// Buscar usuário pelo ID

const inputPesquisaId = document.querySelector('#input-pesquisa');
const btnPesquisaId = document.querySelector('#btn-buscar');

btnPesquisaId.addEventListener('click', () => {
    const urlId = `https://69cc26790b417a19e07be0d9.mockapi.io/user/users/${inputPesquisaId.value}`

    fetch(urlId)
        .then(response => {
            if(!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            return response.json(); 
        })  
        .then(dados => {
            const listaUsuario = [];
            listaUsuario.push(dados);

            main.innerHTML = '';
            exibirDados(listaUsuario);
            inputPesquisaId.value = '';
        })
        .catch(erro => {
            console.error(erro);
            alert('Usuário não encontrado!');
            inputPesquisaId.value = '';
        })

})