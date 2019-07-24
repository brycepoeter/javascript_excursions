let coffeeURL = "http://dc-coffeerun.herokuapp.com/api/coffeeorders/"
let ordersDiv = document.getElementById("ordersDiv")
let coffeeNameTextBox = document.getElementById("coffeeNameTextBox")
let emailAddressTextBox = document.getElementById("emailAddressTextBox")
let enterButton = document.getElementById("enterButton")

enterButton.addEventListener('click', () => {
    let coffee = coffeeNameTextBox.value 
    let email = emailAddressTextBox.value
    placeOrder(coffee,email)
})

function placeOrder(coffee,email) {
    fetch(coffeeURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            emailAddress: email,
            coffee: coffee,
        })
    }).then(response => response.json())
    .then(result => {
        if (result._id) {
            displayOrders()
        } else{
            console.log("It didn't work")
        }
        console.log(result)
    })
}

//One way to do things
fetch(coffeeURL)
    .then(response => {return response.json()})
    .then(json => {console.log(json)})


//Another way 
async function fetchOrders() {
    let response = await fetch(coffeeURL)
    let json = await response.json()
    return json 
}

function displayOrders() {
    fetchOrders().then(json => {console.log(Object.values(json))
    let orders = Object.values(json)
    let orderItems = orders.map(order => {
        return `<div>${order.coffee} - ${order.emailAddress}</div>`
    })
    ordersDiv.innerHTML = orderItems

})
}
displayOrders()