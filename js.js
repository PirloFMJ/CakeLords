const Clickbutton = document.querySelectorAll('.btn')
const tbody = document.querySelector('.tbody')
let carrito = []

Clickbutton.forEach(btn => {
    btn.addEventListener('click', addToCarritoItem)
})

function addToCarritoItem(e){
    const button = e.target
    const item = button.closest('.card')
    const itemTitle = item.querySelector('.card-title').textContent;
    const itemPrice = item.querySelector('.precio').textContent;
    const itemImg = item.querySelector('img').src;

    const newItem = {
        title: itemTitle,
        precio: itemPrice,
        img: itemImg,
        cantidad: 1
}

    addItemCarrito(newItem)

}

function addItemCarrito(newItem){
    
    const InputElemnto = tbody.getElementsByClassName('input__elemento')

    for(let i =0; i < carrito.length ; i++){
        if(carrito[i].title.trim() === newItem.title.trim()){
            carrito[i].cantidad ++;
            const inputValue = InputElemnto[i]
            inputValue.value++;
            CarritoTotal()
            return null;
        }
    }

    carrito.push(newItem)

    renderCarrito()
}

function renderCarrito(){
    tbody.innerHTML = '' 
    carrito.map(item => {
        const tr = document.createElement('tr')
        tr.classList.add('ItemCarrito')
        const Content = `
        <th scope="row">1</th>
            <td class="table__productos">
                <img src="${item.img}" style="width: 160px; height: 160px;">
                <h6 class="title"> ${item.title}</h6>
            </td>
            <td class="table__price"><p>${item.precio}</p></td>
            <td class="table__cantida">
                <input type="number" min="1" value="${item.cantidad}" class="input__elemento">
                <button class="delete btn btn-danger" style="margin-left: 3px;">X</button>
            </td>
        `

        tr.innerHTML = Content
        tbody.appendChild(tr)

        tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
        tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
    })
        CarritoTotal()
}

function CarritoTotal(){
    let Total = 0;
    const itemCartTotal = document.querySelector('.itemCartTotal')
    carrito.forEach((item) => {
        const precio = Number(item.precio.replace("Q", ''))
        Total = Total + precio*item.cantidad
    })

        itemCartTotal.innerHTML = `Total $${Total}`     
}

function removeItemCarrito(e) {
    const buttonDelete = e.target
    const tr = buttonDelete.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;
    for(let i=0; i<carrito.length ; i++){
        if(carrito[i].title.trim() === title.trim()){
            carrito.splice(i, 1)
        }
    }
    tr.remove()
    CarritoTotal()
}

function sumaCantidad(e) {
    const sumaInput = e.target
    const tr = sumaImput.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;
    carrito.forEach(item => {
        if(item.title.trim() === title){
            sumaInput.value < 1 ? (suma.Input.value = 1) : sumaInput.value;
            item.cantidad = sumaInput.value;
            CarritoTotal()
        }
    })
}