const url = 'https://69cc26790b417a19e07be0d9.mockapi.io/user/users';

// Buscando os dados da API com fetch

fetch(url)
    .then(response => response.json())
    .then(dados => {
        exibirDados(dados);
    });

function exibirDados(dados) {
    const main = document.querySelector('main');

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
        "UF"
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
        "uf",
    ];

    dados.forEach((usuario) => {
        const linha = document.createElement('tr');

        chaves.forEach((chave) => {
            const td = document.createElement('td');
            td.textContent = usuario[chave];
            linha.appendChild(td);
        })

        tbody.appendChild(linha);
    })

    tabela.appendChild(tbody);

    // Insere a tabela no main
    main.appendChild(tabela);
}