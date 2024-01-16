const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

boundary_width = 50;
boundary_heigth = 50;

map = [
    ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
    ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
    ['-', ' ', '-', ' ', '-', '-', '-', '-', ' ', '-'],
    ['-', ' ', '-', ' ', ' ', ' ', '-', '-', ' ', '-'],
    ['-', ' ', '-', ' ', '-', ' ', ' ', ' ', ' ', '-'],
    ['-', ' ', ' ', ' ', ' ', ' ', '-', '-', ' ', '-'],
    ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],


];

class Boundary {
    constructor(position) {
        this.position = position;
        this.width = boundary_width;
        this.height = boundary_heigth;
    }

    draw() {
        ctx.fillStyle = "blue";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.width)
    }
}

class Pacman {
    constructor(position) {
        this.position = position
        this.velocity = {
            x: 0,
            y: 0
        }
        this.radius = 17
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.radius, 0.2 * Math.PI, 1.8 * Math.PI);
        ctx.lineTo(this.position.x, this.position.y);
        ctx.fillStyle = "yellow";
        ctx.fill();
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

function check_if_collision(mobile, stationary) {
    return mobile.position.y - mobile.radius + mobile.velocity.y <=
        stationary.position.y + stationary.height &&
        mobile.position.y + mobile.radius + mobile.velocity.y >= stationary.position.y &&
        mobile.position.x + mobile.radius + mobile.velocity.x >= stationary.position.x &&
        mobile.position.x - mobile.radius + mobile.velocity.x <= stationary.position.x + stationary.width;
}

pacman_init_position = {
    x: boundary_width + boundary_width / 2,
    y: boundary_heigth + boundary_heigth / 2
}

pacman = new Pacman(pacman_init_position);
pacman.draw();

boundaries = [];
map.forEach((row, index) => {
    row.forEach((symbol, index2) => {
        if (symbol === "-") {
            boundaries.push(new Boundary({
                x: boundary_width * index2,
                y: boundary_heigth * index
            }))
        }
    })
})

function animate() {
    requestId = window.requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    boundaries.forEach(boundary => {
        boundary.draw();

        if (check_if_collision(pacman, boundary)) {
            pacman.velocity.x = 0;
            pacman.velocity.y = 0;
        }
    })
    pacman.update();
}

animate();

window.addEventListener("keydown", event => {
    if (event.key == "s") {
        pacman.velocity.x = 0;
        pacman.velocity.y = 5;
    }

    if (event.key == "w") {
        pacman.velocity.x = 0;
        pacman.velocity.y = -5;
    }

    if (event.key == "a") {
        pacman.velocity.x = -5;
        pacman.velocity.y = 0;
    }

    if (event.key == "d") {
        pacman.velocity.x = 5;
        pacman.velocity.y = 0;
    }


})

/*
boundaries = [];
map.forEach((row, index) => {
    row.forEach((symbol, index2) => {
        if (symbol === "-") {
            boundaries.push(new Boundary({
                x: boundary_width * index2,
                y: boundary_heigth * index
            }))
        }
    })
});

boundaries.forEach(boundary => {
    boundary.draw();
})*/