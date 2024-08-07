let cadastros = [];

function validarCampos() {
    let isValid = true;

    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const telefone = document.getElementById('telefone');

    if (nome.value.trim() === "") {
        nome.classList.add('invalid');
        isValid = false;
    } else {
        nome.classList.remove('invalid');
        nome.classList.add('valid');
    }

    if (email.value.trim() === "") {
        email.classList.add('invalid');
        isValid = false;
    } else {
        email.classList.remove('invalid');
        email.classList.add('valid');
    }

    if (telefone.value.trim() === "") {
        telefone.classList.add('invalid');
        isValid = false;
    } else {
        telefone.classList.remove('invalid');
        telefone.classList.add('valid');
    }

    return isValid;
}

function salvarDados() {
    if (!validarCampos()) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;

    const cadastro = {
        id: Date.now(),
        nome: nome,
        email: email,
        telefone: telefone
    };

    cadastros.push(cadastro);
    atualizarLista();
    limparFormulario();
}

function atualizarLista() {
    const lista = document.getElementById('listaCadastros');
    lista.innerHTML = '';

    cadastros.forEach(cadastro => {
        const item = document.createElement('li');
        item.textContent = `Nome: ${cadastro.nome}, Email: ${cadastro.email}, Telefone: ${cadastro.telefone}`;
        item.appendChild(criarBotoes(cadastro.id));
        lista.appendChild(item);
    });
}

function criarBotoes(id) {
    const div = document.createElement('div');

    const btnAlterar = document.createElement('button');
    btnAlterar.textContent = 'Alterar';
    btnAlterar.onclick = () => alterarCadastro(id);
    div.appendChild(btnAlterar);

    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = 'Excluir';
    btnExcluir.onclick = () => excluirCadastro(id);
    div.appendChild(btnExcluir);

    return div;
}

function alterarCadastro(id) {
    const cadastro = cadastros.find(cadastro => cadastro.id === id);

    document.getElementById('nome').value = cadastro.nome;
    document.getElementById('email').value = cadastro.email;
    document.getElementById('telefone').value = cadastro.telefone;

    cadastros = cadastros.filter(cadastro => cadastro.id !== id);
    atualizarLista();
}

function excluirCadastro(id) {
    if (confirm('Tem certeza que deseja excluir este cadastro?')) {
        cadastros = cadastros.filter(cadastro => cadastro.id !== id);
        atualizarLista();
    }
}

function limparFormulario() {
    document.getElementById('formcadastro').reset();
    document.querySelectorAll('input').forEach(input => {
        input.classList.remove('valid');
        input.classList.remove('invalid');
    });
}
