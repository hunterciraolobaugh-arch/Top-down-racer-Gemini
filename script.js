const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

const car = { x: 400, y: 300, width: 30, height: 50, angle: 0, speed: 0, accel: 0.2, fric: 0.96, steer: 0.06 };
const keys = {};

window.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
window.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

function update() {
    if (keys["w"]) car.speed += car.accel;
    if (keys["s"]) car.speed -= car.accel;
    car.speed *= car.fric;
    if (Math.abs(car.speed) > 0.1) {
        const dir = car.speed > 0 ? 1 : -1;
        if (keys["a"]) car.angle -= car.steer * dir;
        if (keys["d"]) car.angle += car.steer * dir;
    }
    car.x += Math.cos(car.angle) * car.speed;
    car.y += Math.sin(car.angle) * car.speed;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Grid Lines
    ctx.strokeStyle = "#444";
    for (let i = 0; i < canvas.width; i += 50) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
    }
    for (let j = 0; j < canvas.height; j += 50) {
        ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(canvas.width, j); ctx.stroke();
    }

    ctx.save();
    ctx.translate(car.x, car.y);
    ctx.rotate(car.angle);
    ctx.fillStyle = "red";
    ctx.fillRect(-25, -15, 50, 30);
    ctx.fillStyle = "black";
    ctx.fillRect(10, -15, 10, 30);
    ctx.restore();
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}
loop();
