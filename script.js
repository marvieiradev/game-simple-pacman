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
}

pacman_init_position = {
    x: boundary_width + boundary_width / 2,
    y: boundary_heigth + boundary_heigth / 2
}

pacman = new Pacman(pacman_init_position);
pacman.draw();
//12:32

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
})