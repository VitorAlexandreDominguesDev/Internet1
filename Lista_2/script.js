document.addEventListener('DOMContentLoaded', () => {
    const carrinhoItensContainer = document.querySelector('.carrinho-itens');
    const totalCarrinhoElement = document.getElementById('total-carrinho');
    const botoesAdicionar = document.querySelectorAll('.adicionar-carrinho');
    const carrinho = [];

    botoesAdicionar.forEach(botao => {
        botao.addEventListener('click', adicionarAoCarrinho);
    });

    function adicionarAoCarrinho(event) {
        const botao = event.target;
        const produtoElement = botao.closest('.produto');
        
        const produto = {
            id: produtoElement.dataset.id,
            nome: produtoElement.querySelector('.produto-nome').innerText,
            preco: parseFloat(produtoElement.querySelector('.produto-preco').innerText.replace('R$', '').replace(',', '.')),
            imagem: produtoElement.querySelector('img').src,
            quantidade: 1
        };

        const itemExistente = carrinho.find(item => item.id === produto.id);

        if (itemExistente) {
            itemExistente.quantidade++;
        } else {
            carrinho.push(produto);
        }

        atualizarCarrinho();
    }

    function atualizarCarrinho() {
        carrinhoItensContainer.innerHTML = '';
        let total = 0;

        if (carrinho.length === 0) {
            carrinhoItensContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
        } else {
            carrinho.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('carrinho-item');
                
                const precoTotalItem = item.preco * item.quantidade;
                total += precoTotalItem;

                itemElement.innerHTML = `
                    <div class="carrinho-item-info">
                        <h4>${item.nome}</h4>
                        <p>Preço unitário: R$ ${item.preco.toFixed(2).replace('.', ',')}</p>
                        <p class="carrinho-item-preco-total">Total: R$ ${precoTotalItem.toFixed(2).replace('.', ',')}</p>
                    </div>
                    <div class="carrinho-item-quantidade">
                        <button class="diminuir-qtd" data-index="${index}">-</button>
                        <span>${item.quantidade}</span>
                        <button class="aumentar-qtd" data-index="${index}">+</button>
                    </div>
                `;
                carrinhoItensContainer.appendChild(itemElement);
            });
        }
        
        totalCarrinhoElement.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
        adicionarEventosQuantidade();
    }
    
    function adicionarEventosQuantidade() {
        document.querySelectorAll('.diminuir-qtd').forEach(botao => {
            botao.addEventListener('click', (e) => mudarQuantidade(e.target.dataset.index, -1));
        });

        document.querySelectorAll('.aumentar-qtd').forEach(botao => {
            botao.addEventListener('click', (e) => mudarQuantidade(e.target.dataset.index, 1));
        });
    }

    function mudarQuantidade(index, mudanca) {
        const item = carrinho[index];
        item.quantidade += mudanca;

        if (item.quantidade <= 0) {
            carrinho.splice(index, 1); 
        }
        
        atualizarCarrinho();
    }
    
    atualizarCarrinho(); 
});