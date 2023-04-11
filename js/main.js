const form = document.querySelector("#novoItem");
const ul = document.querySelector('#lista');
itens = [];

form.addEventListener('submit', evt => {
    evt.preventDefault();

    const nome = evt.target.elements['nome']
    const quantidade = evt.target.elements['quantidade'];

    createElement(nome.value, quantidade.value);
    nome.value = "";
    quantidade.value = "";
})

function createElement(nome, quantidade) {
    const newItem = document.createElement('li');
    newItem.classList.add('item');
    
    const itemNumber = document.createElement('strong');
    itemNumber.innerHTML = quantidade
    
    newItem.appendChild(itemNumber);
    newItem.innerHTML += nome;
    
    ul.appendChild(newItem);

    const itemAtual = { 
        "nome": nome, 
        "quantidade": quantidade
    }

    itens.push(itemAtual)

    localStorage.setItem('item', JSON.stringify(itens));
}