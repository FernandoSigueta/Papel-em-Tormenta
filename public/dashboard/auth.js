async function verificarSessao() {
    try {
        const resposta = await fetch('/api/usuarios/sessao');
        if (resposta.status === 401) {
            window.location.replace('../login_cadastro/login_cad.html');
            return;
        }
        if (!resposta.ok) {
            throw new Error('Não foi possível verificar a sessão.');
        }

        const dados = await resposta.json();
        const nomeUsuario = document.getElementById('nome_usuario');
        if (nomeUsuario) {
            nomeUsuario.textContent = dados.usuario.nome;
        }
    } catch (erro) {
        console.error('Falha ao verificar a sessão.', erro);
        window.alert('Não foi possível conectar ao servidor. Tente novamente.');
    }
}

async function encerrarSessao(evento) {
    evento.preventDefault();
    try {
        const resposta = await fetch('/api/usuarios/sair', { method: 'POST' });
        if (!resposta.ok) {
            throw new Error('Não foi possível encerrar a sessão.');
        }
        window.location.replace('../home/index.html');
    } catch (erro) {
        console.error('Falha ao encerrar a sessão.', erro);
        window.alert('Não foi possível sair da conta. Tente novamente.');
    }
}

document.querySelectorAll('[data-logout]').forEach((link) => {
    link.addEventListener('click', encerrarSessao);
});

verificarSessao();
