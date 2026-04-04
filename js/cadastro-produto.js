const formProdutos = document.querySelector(".form-cadastro-produtos");

formProdutos.addEventListener('submit', (e) => {
    e.preventDefault();

    const formDados = new FormData(formProdutos);
    const dadosProdutos = Object.fromEntries(formDados);

    const url = 'https://69cc26790b417a19e07be0d9.mockapi.io/user/produtos';

    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosProdutos)
    })
    .then(response => response.json())
    .then(() => {
        alert('Produto cadastrado com sucesso!')
        formProdutos.reset();
    })
    .catch(erro => {
        console.error(erro);
        console.log(`Erro HTTP: ${erro.status}`)
    })
})