// Carrega as músicas do localStorage ou cria um array vazio se não houver músicas salvas
let musicList = JSON.parse(localStorage.getItem('musicList')) || [];

// Função para adicionar música
function addMusic() {
    const title = document.getElementById('titleInput').value;
    const artist = document.getElementById('artistInput').value;
    const genre = document.getElementById('genderInput').value;
    const duration = document.getElementById('durationInput').value;
    const musicFile = document.getElementById('musicInput').files[0]; // Captura o arquivo MP3 selecionado

    // Verifica se todos os campos foram preenchidos e se um arquivo foi selecionado
    if (!title || !artist || !genre || !duration || !musicFile) {
        alert('Todos os campos devem ser preenchidos!');
        return;
    }

    // Lê o arquivo MP3 selecionado
    const reader = new FileReader();
    reader.onloadend = function(event) {
        // A música é armazenada como base64
        const musicData = event.target.result;

        // Cria um objeto de música com as informações fornecidas
        const musicEntry = {
            title,
            artist,
            genre,
            duration,
            musicData,  // Armazena a música como base64
        };

        // Adiciona a música ao array de músicas
        musicList.push(musicEntry);

        // Salva o array de músicas atualizado no localStorage
        localStorage.setItem('musicList', JSON.stringify(musicList));

        // Limpa os campos do formulário
        clearInputFields();

        // Exibe uma mensagem de sucesso
        alert('Música cadastrada com sucesso!');

        // Atualiza a exibição das playlists
        renderPlaylists();
    };

    // Lê o arquivo como URL base64
    reader.readAsDataURL(musicFile);
}

// Função para adicionar música
function addMusic() {
    const title = document.getElementById('titleInput').value;
    const artist = document.getElementById('artistInput').value;
    const genre = document.getElementById('genderInput').value;
    const duration = document.getElementById('durationInput').value;
    const musicFile = document.getElementById('musicInput').files[0];

    // Verifica se todos os campos foram preenchidos e se um arquivo foi selecionado
    if (!title || !artist || !genre || !duration || !musicFile) {
        alert('Todos os campos devem ser preenchidos!');
        return;
    }

    // Lê o arquivo MP3 e converte para base64
    const reader = new FileReader();
    reader.onload = function(event) {
        const musicEntry = {
            title,
            artist,
            genre,
            duration,
            musicData: event.target.result // Música convertida para base64
        };

        // Adiciona a música à lista
        musicList.push(musicEntry);

        // Salva no localStorage
        localStorage.setItem('musicList', JSON.stringify(musicList));

        // Limpa os campos de entrada
        clearInputFields();

        // Exibe uma mensagem de sucesso
        alert('Música cadastrada com sucesso!');

        // Atualiza a exibição das playlists
        renderPlaylists();
    };

    // Lê o arquivo como uma URL em base64
    reader.readAsDataURL(musicFile);
}

// Função para limpar os campos de entrada
function clearInputFields() {
    document.getElementById('titleInput').value = '';
    document.getElementById('artistInput').value = '';
    document.getElementById('genderInput').value = '';
    document.getElementById('durationInput').value = '';
    document.getElementById('musicInput').value = '';
}

// Função para renderizar as playlists
function renderPlaylists() {
    const playlistsContainer = document.querySelector('.playlists-container');
    playlistsContainer.innerHTML = ''; // Limpa playlists existentes

    // Cria um cartão para cada música na lista
    musicList.forEach((music, index) => {
        const playlistDiv = document.createElement('div');
        playlistDiv.className = 'playlist';

        const playlistInfoDiv = document.createElement('div');
        playlistInfoDiv.className = 'playlist-info';

        const titleElem = document.createElement('p');
        titleElem.className = 'playlist-title';
        titleElem.textContent = music.title;

        const descriptionElem = document.createElement('p');
        descriptionElem.className = 'playlist-description';
        descriptionElem.textContent = `Artista: ${music.artist}, Gênero: ${music.genre}, Duração: ${music.duration}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Deletar';
        deleteButton.className = 'delete-button';
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Impede a propagação do evento
            deleteMusic(index); // Chama a função para deletar a música
        });

        // Cria a imagem de play com link para reproduzir o áudio
        const link = document.createElement('a');
        link.href = '#'; // Não é necessário um link, apenas uma ação de clique
        link.style.textDecoration = 'none'; // Remove sublinhado do link
        link.style.color = 'white'; // Define a cor do texto
        link.classList.add('play-button');
        link.addEventListener('click', () => playMusic(music.musicData));

        const img = document.createElement('img');
        img.src = './play.jpg'; // Imagem de espaço reservado
        img.alt = music.title;
        img.style.cursor = 'pointer'; // Muda o cursor para indicar que é clicável

        // Adiciona a imagem ao link
        link.appendChild(img);

        // Adiciona as informações da playlist
        playlistInfoDiv.appendChild(titleElem);
        playlistInfoDiv.appendChild(descriptionElem);
        playlistInfoDiv.appendChild(deleteButton);

        // Adiciona o link (com a imagem) e as informações da playlist à div da playlist
        playlistDiv.appendChild(link);
        playlistDiv.appendChild(playlistInfoDiv);
        playlistsContainer.appendChild(playlistDiv);
    });
}

// Função para deletar música
function deleteMusic(index) {
    musicList.splice(index, 1); // Remove a música do array
    localStorage.setItem('musicList', JSON.stringify(musicList)); // Atualiza o localStorage
    renderPlaylists(); // Atualiza a exibição das músicas
}

// Função para reproduzir música
function playMusic(musicData) {
    const musicPlayer = document.getElementById('musicPlayer');
    musicPlayer.src = musicData;
    musicPlayer.style.display = 'block'; // Exibe o player
    musicPlayer.play();
}

// Adiciona evento de busca
document.getElementById('searchButton').addEventListener('click', function() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const playlists = document.querySelectorAll('.playlist');
    playlists.forEach(playlist => {
        const title = playlist.querySelector('.playlist-title').textContent.toLowerCase();
        playlist.style.display = title.includes(query) ? 'flex' : 'none';
    });
});

// Inicializa a renderização das playlists
renderPlaylists();

// Adiciona evento de cadastro de música
document.getElementById('registerId').addEventListener('click', addMusic);
