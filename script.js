const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

boundary_width = 50;
boundary_heigth = 50;

map = [
    ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
    ['-', '.', '.', '.', '.', '.', '.', '.', '.', '-'],
    ['-', '.', '-', '.', '-', '-', '-', '-', '.', '-'],
    ['-', '.', '-', '.', '.', '.', '-', '-', '.', '-'],
    ['-', '.', '-', '.', '-', '.', '.', '.', '.', '-'],
    ['-', '.', '.', '.', '.', '.', '-', '-', '.', '-'],
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
        this.radius = 20
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

class Food {
    constructor(position) {
        this.position = position
        this.radius = 10
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.radius, 0 * Math.PI, 2 * Math.PI);
        ctx.lineTo(this.position.x, this.position.y);
        ctx.fillStyle = "white";
        ctx.fill();
    }
}

function check_if_collision(mobile, stationary) {
    return mobile.position.y - mobile.radius + mobile.velocity.y <=
        stationary.position.y + stationary.height &&
        mobile.position.y + mobile.radius + mobile.velocity.y >= stationary.position.y &&
        mobile.position.x + mobile.radius + mobile.velocity.x >= stationary.position.x &&
        mobile.position.x - mobile.radius + mobile.velocity.x <= stationary.position.x + stationary.width;
}

function check_if_food_eaten(pacman, food) {
    return (Math.hypot(pacman.position.x - food.position.x, pacman.position.y - food.position.y) <= pacman.radius + food.radius)
}

pacman_init_position = {
    x: boundary_width + boundary_width / 2,
    y: boundary_heigth + boundary_heigth / 2
}

pacman = new Pacman(pacman_init_position);
pacman.draw();

boundaries = [];
foods = [];
map.forEach((row, index) => {
    row.forEach((symbol, index2) => {
        if (symbol === "-") {
            boundaries.push(new Boundary({
                x: boundary_width * index2,
                y: boundary_heigth * index
            }))
        }

        if (symbol === ".") {
            foods.push(new Food({
                x: boundary_width * index2 + boundary_width / 2,
                y: boundary_heigth * index + boundary_heigth / 2
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

    foods.forEach((food, index) => {
        food.draw();
        if (check_if_food_eaten(food, pacman)) {
            foods.splice(index, 1);
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

//28:05