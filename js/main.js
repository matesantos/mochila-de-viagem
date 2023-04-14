const form = document.querySelector("#novoItem");
const ul = document.querySelector('#lista');
const itens = JSON.parse(localStorage.getItem('itens')) || [];

itens.forEach(item => createElement(item));

form.addEventListener('submit', evt => {
    evt.preventDefault();

    const nome = evt.target.elements['nome']
    const quantidade = evt.target.elements['quantidade'];

    const isPresent = itens.find(item => item.nome === nome.value);

    const itemAtual = { 
        "nome": nome.value, 
        "quantidade": quantidade.value
    }

    if(isPresent){
        itemAtual.id = isPresent.id
        updateElement(itemAtual);
        itens[itens.findIndex(elemento => elemento.id === isPresent.id)] = itemAtual
    }else{
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id +1 : 0
        createElement(itemAtual);
        itens.push(itemAtual)
    } 
    
    localStorage.setItem('itens', JSON.stringify(itens));
    nome.value = "";
    quantidade.value = "";
})

function createElement(item) {
    const newItem = document.createElement('li');
    newItem.classList.add('item');
    
    const itemNumber = document.createElement('strong');
    itemNumber.innerHTML = item.quantidade
    itemNumber.dataset.id = item.id;
    
    newItem.appendChild(itemNumber);
    newItem.innerHTML += item.nome;
    
    newItem.appendChild(buttonElement(item.id));
    ul.appendChild(newItem);
}

function updateElement(itemAtual){
    const element = document.querySelector(`[data-id="${itemAtual.id}"]`);
    element.innerHTML = itemAtual.quantidade; 
}

function buttonElement(id){
    const buttonElement = document.createElement('button');
    buttonElement.innerHTML = 'X';
    buttonElement.addEventListener('click',function(){
        deleteElement(this.parentNode, id)
    })
    return buttonElement;
}

function deleteElement(tag, id){
    tag.remove();
    const index = itens.findIndex(element => element.id === id);
    itens.splice(index,1);
    localStorage.setItem("itens", JSON.stringify(itens));
}