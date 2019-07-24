

function handleSignUp() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END createwithemail]
    }

let signUpButton = document.getElementById("signUpButton")

signUpButton.addEventListener('click', () => {
    handleSignUp()
    window.alert("You signed up!")})

function toggleSignIn() {
   if (firebase.auth().currentUser) {
      // [START signout]
      firebase.auth().signOut();      
      // [END signout]
    } else {
      var email = document.getElementById('userEmail').value;
      var password = document.getElementById('userPassword').value;
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      // Sign in with email and pass.
      // [START authwithemail]
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);

        // [END_EXCLUDE]
      });
      // [END authwithemail]
    }

  }


  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      console.log("THIS IS SIGN IN DATA")
      console.log(displayName)
      console.log(email)
      // ...
    } else {
      // User is signed out.
      // ...
    }
  });


let signInButton = document.getElementById("signInButton")
signInButton.addEventListener('click', () => {
    toggleSignIn()
    window.alert("You signed in!")
})













let storeNameTextBox = document.getElementById("storeNameTextBox")
let storeAddressTextBox = document.getElementById("storeAddressTextBox")
let addListButton = document.getElementById("addListButton")
let groceryListsDiv = document.getElementById("groceryListsDiv")
let database = firebase.database()
let listsRef = database.ref("lists")

function displayLists(lists) {
    let listItems = lists.map(list => {
        return `<div class="individualList"><div>${list.name} - ${list.address}</div>
        <button onclick="deleteList('${list.key}')">Delete Store</button></div>`
    })
    groceryListsDiv.innerHTML = listItems.join("")
}

function deleteList(key) {
    listsRef.child(key).remove()
}

function saveList(name, address) {
    listsRef.push({
        name: name,
        address: address
    })
}

listsRef.on('value', (snapshot) => {
    let lists = []
    console.log("Value change event occured")
    for(key in snapshot.val()) {
        let list = snapshot.val()[key]
        list.key = key 
        console.log(list)
        lists.push(list)
    }
    displayLists(lists)
})

addListButton.addEventListener('click', () => {
    let name = storeNameTextBox.value 
    let address = storeAddressTextBox.value
    saveList(name, address)
})






