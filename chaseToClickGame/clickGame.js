const output = document.querySelector(".output")
const messageOut = document.querySelectorAll(".message span")
let score = 0 

output.addEventListener("mousemove", (e) => {
    messageOut[0].innerText = e.x
    messageOut[1].innerText = e.y
})

document.addEventListener("DOMContentLoaded", function() {
    let div = document.createElement("div");
    div.classList.add("box");
    output.appendChild(div);
    div.x = div.offsetLeft;
    div.y = div.offsetTop;
    div.tempColor = "#" + Math.random().toString(16).substr(-6);
    div.style.backgroundColor = div.tempColor;
    div.addEventListener("mouseenter", (e) => {
        div.style.backgroundColor = "red"
    })
    div.addEventListener("mouseleave", (e) => {
        div.style.backgroundColor = div.tempColor
    })
    div.addEventListener("click", (e) => {
        div.tempColor = "#" + Math.random().toString(16).substr(-6);
        div.style.backgroundColor = div.tempColor
        score ++;
        messageOut[2].innerText = score;
    })
    div.steps = Math.random() * 20;
    div.direction = Math.floor(Math.random() * 4)
    window.requestAnimationFrame(move);

})

function move(){
    let speed = Math.random() * 3 + 5; 
    const box = document.querySelector(".box")
    let bounds = output.getBoundingClientRect();
    box.steps--;
    if (box.steps < 0) {
        box.direction = Math.floor(Math.random() * 4)
        box.steps = Math.random() * 20;
    }
    if (box.direction == 0 && box.x < bounds.right - 100) {
        box.x += speed 
    }
    if (box.direction == 1 && box.x > bounds.left) {
        box.x -= speed
    }
    if (box.direction == 2 && box.y < bounds.bottom - 100) {
        box.y += speed
    }
    if (box.direction == 3 && box.y > bounds.top) {
        box.y -= speed
    }
    box.style.top = box.y + "px"
    box.style.left = box.x + "px"

    window.requestAnimationFrame(move);
}
