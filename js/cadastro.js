const cep = document.querySelector('#cep');
const formulario = document.querySelector('.formulario');

formulario.addEventListener('submit', async (envio) => {
    envio.preventDefault();

    const formDados = new FormData(formulario);
    const dadosUsuario = Object.fromEntries(formDados);

    const url = 'https://69cc26790b417a19e07be0d9.mockapi.io/user/users';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dadosUsuario)
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const dados = await response.json();

        console.log('Usuário criado com sucesso', dados);
        alert('Cadastro realizado com sucesso!');
        formulario.reset();


    } catch (erro) {
        console.error('Falha ao cadastrar', erro);
        alert('Erro ao cadastrar, tente novamente.');
    }
})

cep.addEventListener('input', () => {
    if (cep.value.length == 8) {
        buscarCep();
    } else {
        console.log('O CEP precisa ter 8 dígitos.')
    }
})

function buscarCep() {
    const url = `https://viacep.com.br/ws/${cep.value}/json/`;

    fetch(url)
        .then(response => response.json())
        .then((dados) => {
            if (dados.erro) {
                console.error('CEP inválido', dados.erro);

                formulario.logradouro.value = "";
                formulario.bairro.value = "";
                formulario.cidade.value = "";
                formulario.uf.value = "";
                formulario.numero.value = "";
                formulario.complemento.value = "";

                return;
            }

            formulario.logradouro.value = dados.logradouro;
            formulario.bairro.value = dados.bairro;
            formulario.cidade.value = dados.localidade;
            formulario.uf.value = dados.uf;

            formulario.numero.focus();
        })
}
