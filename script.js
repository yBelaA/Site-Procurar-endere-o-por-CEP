function buscarEndereco() {
    // Pegar o valor do CEP digitado
    let cep = document.getElementById('cep').value;
    
    // Mostrar loading
    document.getElementById('loading').style.display = 'block';
    document.getElementById('dados-endereco').innerHTML = '';
    
    // Remover caracteres especiais
    cep = cep.replace(/\D/g, '');
    
    // Validar CEP
    if (cep.length !== 8) {
        mostrarErro('🎀 CEP inválido! Digite 8 números mágicos 🎀');
        document.getElementById('loading').style.display = 'none';
        return;
    }
    
    // URL da API
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    
    // Buscar na API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById('loading').style.display = 'none';
            
            if (data.erro) {
                mostrarErro('🌸 CEP não encontrado! A Hello Kitty não achou esse endereço 🌸');
                return;
            }
            
            // Criar HTML com os dados
            const dadosHTML = `
                <div class="endereco-item">
                    <div class="emoji-item">📍</div>
                    <div class="info-item">
                        <strong>CEP</strong>
                        <span>${formatarCEP(cep)}</span>
                    </div>
                </div>
                <div class="endereco-item">
                    <div class="emoji-item">🏠</div>
                    <div class="info-item">
                        <strong>Logradouro</strong>
                        <span>${data.logradouro || 'Não disponível'}</span>
                    </div>
                </div>
                <div class="endereco-item">
                    <div class="emoji-item">🌳</div>
                    <div class="info-item">
                        <strong>Bairro</strong>
                        <span>${data.bairro || 'Não disponível'}</span>
                    </div>
                </div>
                <div class="endereco-item">
                    <div class="emoji-item">🏛️</div>
                    <div class="info-item">
                        <strong>Cidade</strong>
                        <span>${data.localidade || 'Não disponível'}</span>
                    </div>
                </div>
                <div class="endereco-item">
                    <div class="emoji-item">🗺️</div>
                    <div class="info-item">
                        <strong>Estado</strong>
                        <span>${data.uf || 'Não disponível'}</span>
                    </div>
                </div>
                <div class="endereco-item">
                    <div class="emoji-item">🏢</div>
                    <div class="info-item">
                        <strong>Complemento</strong>
                        <span>${data.complemento || 'Não disponível'}</span>
                    </div>
                </div>
                ${data.gia ? `
                <div class="endereco-item">
                    <div class="emoji-item">📋</div>
                    <div class="info-item">
                        <strong>GIA</strong>
                        <span>${data.gia}</span>
                    </div>
                </div>
                ` : ''}
            `;
            
            document.getElementById('dados-endereco').innerHTML = dadosHTML;
            
            // Adicionar animação de coração
            mostrarMensagemSucesso();
        })
        .catch(error => {
            console.error('Erro:', error);
            document.getElementById('loading').style.display = 'none';
            mostrarErro('🎀 Erro ao buscar! Tente novamente mais tarde 🎀');
        });
}

function mostrarErro(mensagem) {
    document.getElementById('dados-endereco').innerHTML = `
        <div class="error-message">
            <p>😿 ${mensagem} 😿</p>
            <p style="font-size: 30px; margin-top: 10px;">🎀</p>
        </div>
    `;
}

function mostrarMensagemSucesso() {
    // Adicionar um coração animado temporário
    const coracao = document.createElement('div');
    coracao.innerHTML = '❤️';
    coracao.style.position = 'fixed';
    coracao.style.top = '50%';
    coracao.style.left = '50%';
    coracao.style.transform = 'translate(-50%, -50%)';
    coracao.style.fontSize = '50px';
    coracao.style.animation = 'heartbeat 1s ease-out';
    coracao.style.zIndex = '9999';
    document.body.appendChild(coracao);
    
    setTimeout(() => {
        coracao.remove();
    }, 1000);
}

function formatarCEP(cep) {
    if (cep.length === 8) {
        return cep.substring(0, 5) + '-' + cep.substring(5);
    }
    return cep;
}

// Formatar CEP enquanto digita
document.getElementById('cep').addEventListener('input', function(e) {
    let cep = e.target.value;
    
    // Remover caracteres não numéricos
    cep = cep.replace(/\D/g, '');
    
    // Limitar a 8 dígitos
    if (cep.length > 8) {
        cep = cep.substring(0, 8);
    }
    
    // Adicionar hífen
    if (cep.length > 5) {
        cep = cep.substring(0, 5) + '-' + cep.substring(5);
    }
    
    e.target.value = cep;
});

// Buscar ao pressionar Enter
document.getElementById('cep').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        buscarEndereco();
    }
});

// Mensagem inicial fofa
window.onload = function() {
    const mensagemInicial = `
        <div class="endereco-item">
            <div class="emoji-item">🎀</div>
            <div class="info-item">
                <strong>Olá!</strong>
                <span>Digite um CEP para começar 🌸</span>
            </div>
        </div>
        <div class="endereco-item">
            <div class="emoji-item">🐱</div>
            <div class="info-item">
                <strong>Dica</strong>
                <span>A Hello Kitty vai te ajudar! 💕</span>
            </div>
        </div>
    `;
    document.getElementById('dados-endereco').innerHTML = mensagemInicial;
};