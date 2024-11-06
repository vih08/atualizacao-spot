
function cadastrarUsuario(){
    //chamando os id em variaveis
    let name = document.getElementById('name').value
    let email = document.getElementById('email').value
    let confirmEmail = document.getElementById('confirm-email').value
    let password = document.getElementById('password').value
    let confirmPassword = document.getElementById('confirm-password').value

    //pegando dados dos usuarios na localStorage ou criando lista vazia caso nao tenha dados armazenados
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [] 

    //validando confirmar email e confirmar senha
    if(email !== confirmEmail){
        document.getElementById('mensagem').innerText = 'Emails estão diferentes'
        return
    }
    if(password !== confirmPassword){
        document.getElementById('mensagem').innerText = 'Senhas estão diferentes'
        return
    }


    //verificando se o email já foi usado para fazer algum cadastro
    let usuarioExistente = usuarios.find(usuario => usuario.email === email)
    if(usuarioExistente){
        document.getElementById('mensagem').innerText = 'E-mail já cadastrado'
        return
    }

    //criando um objeto usuario para colocar na lista de usuarios
    let novoUsuario = {
        id: Date.now(),
        nome: name,
        email: email,
        senha: btoa(password), //salvando a senha com criptografia
        playlists: []
    }

    //colocar o objeto novoUsuario no fim da lista de usuarios
    usuarios.push(novoUsuario)

    //salvar na localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios))
    document.getElementById('mensagem').innerText = 'Usuario foi cadastrado'

    setTimeout(() => {
        window.location.href = 'index.html'
    },4000)
}

function voltar(){
    window.location.href = 'index.html'
}