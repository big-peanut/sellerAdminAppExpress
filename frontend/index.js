const myform = document.getElementById('myform')
const itemlist = document.getElementById('itemlist')
let totalPrice=0

function updateTotalPrice() {
    const totalPriceElement = document.getElementsByTagName('p'); // Assuming you add a class "total-price" to the total price element
    totalPriceElement.textContent = `Total Price: ${totalPrice}`;
  }

function removeFromScreen(id){
    const listItem = document.getElementById(id);
    if (listItem && listItem.parentNode === itemlist) {
        const priceElement = listItem.querySelector('#price')
        const price = parseFloat(priceElement.textContent.split(': ')[1])
        totalPrice -= price
        listItem.remove()
        updateTotalPrice()
    }
}

async function delItem(id){
    try{
        await axios.delete(`http://localhost:3000/delItem/${id}`)
        removeFromScreen(id)
    }
    catch(err){
        console.log(err)
    }
}

function display(items){
    totalPrice=0
    itemlist.innerHTML=""
    for(let i=0;i<items.allitems.length;i++){
        const li=document.createElement('li')
        li.setAttribute("id", items.allitems[i].id)
        li.textContent=`ITEM : ${items.allitems[i].item}  PRICE : ${items.allitems[i].price}`
        itemlist.appendChild(li)

        const delButton=document.createElement('button')
        delButton.textContent="Remove Item"
        delButton.addEventListener('click',()=>delItem(items.allitems[i].id))
        li.appendChild(delButton)
        totalPrice += parseFloat(items.allitems[i].price)

    }
    const totalPriceElement = document.createElement('p')
    totalPriceElement.textContent = `Total Price: ${totalPrice}`
    itemlist.appendChild(totalPriceElement)
}

async function getItem() {
    try {
        const res = await axios.get("http://localhost:3000/getItem");
        display(res.data)
    }
    catch (err) {
        console.log(err);
    }
}

async function addItem(item, price) {
    try {
        let products = {
            item: item,
            price: price
        }
        const response = await axios.post("http://localhost:3000/addItem", products)
        console.log(response)
        getItem()
        totalPrice += parseFloat(price);
        updateTotalPrice();
    }
    catch(err){
        console.log(err)
    }
}

myform.addEventListener('submit', (e) => {
    e.preventDefault()

    let item = document.getElementById('item')
    let price = document.getElementById('price')

    addItem(item.value, price.value)
})

document.addEventListener('DOMContentLoaded',getItem)