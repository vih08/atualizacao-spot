
function login() {
    let email = document.getElementById('login-email').value;
    let password = document.getElementById('login-password').value;

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Buscar o usuário e senha no localStorage
    let usuario = usuarios.find(usuario => usuario.email === email && atob(usuario.senha) === password);

    // Verificando se o usuário e a senha estão corretos
    if (usuario) {
        // Armazenar que está logado no sessionStorage
        sessionStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        // Redirecionar para a nova página
        window.location.href = 'file:///C:/Users/vitoria_silva18/Desktop/spotify_atualizado/spotify_atualizado/sim/simparte2/index.html';
    } else {
        document.getElementById('mensagem').innerText = 'Email ou senha incorretos';
        return;
    }
    if(tocar){
        sessionStorage.setItem('musicaCadastrada', JSON.stringify(tocar));
    }
}

