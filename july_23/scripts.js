let ordersDiv = document.getElementById("ordersDiv")

function get(url) {
    return new Promise(function(resolve, reject) {
        let req = new XMLHttpRequest()
        req.open("GET", url);
        req.onload = function() {
            if (req.status == 200) {
                resolve(req.response)
            }
            else {
                reject(Error(req.statusText))
            }
        }
        req.onerror = function () {
            reject(Error("Network Error"))
        }
        req.send()
    })
}

function post(url) {
    return new Promise(function(resolve, reject) {
        let req = new XMLHttpRequest()
        req.open("POST", url)
        req.onload = function() {
            if (req.status == 200) {
                resolve(req.response)
            }
            else {
                reject(Error(req.statusText))
            }
        req.onerror = function () {
            reject(Error("Network Error"))
        }    
        }
        req.send()
    })
}

url = "http://dc-coffeerun.herokuapp.com/api/coffeeorders" 

get(url).then(function(response) {
    return JSON.parse(response)
}).then(function(response) {
    let emailAddresses = Object.keys(response)
    let coffeeItems = emailAddresses.map(email => {
        let order = response[email]
        return `<li>${order.emailAddress} ordered ${order.coffee}</li>`
    })
}), function(error) {
    console.log("Nay :/", error)
}
