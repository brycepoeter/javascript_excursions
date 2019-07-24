let nameTextBox = document.getElementById("nameTextBox")
let ageTextBox = document.getElementById("ageTextBox")
let addUserButton = document.getElementById("addUserButton")
let userList = document.getElementById("userList")
let database = firebase.database()
let usersRef = database.ref("users")

usersRef.on('value', (snapshot) => {
    let users = []
    console.log("Value change event occured")
    for(key in snapshot.val()) {
        let user = snapshot.val()[key]
        user.key = key 
        console.log(user)
        users.push(user)
    }
    displayUsers(users)
    //let users = Object.values(snapshot.val())
    //console.log(users)
})


function displayUsers(users) {
    let userItems = users.map(user => {
        return `<div>${user.name} - ${user.age}</div>
        <button onclick="deleteUser('${user.key}')">Delete User</button>`
    })
    userList.innerHTML = userItems.join("")
}

function deleteUser(key) {
    usersRef.child(key).remove()
}

addUserButton.addEventListener('click', () => {
    let name = nameTextBox.value 
    let age = parseInt(ageTextBox.value)
    saveUser(name, age)
})

function saveUser(name, age) {
    usersRef.push({
        name: name,
        age: age
    })
}




/*let usersRef = database.ref("users")
usersRef.child("user1").set({
    name: "John", 
    age: 34
})*/

