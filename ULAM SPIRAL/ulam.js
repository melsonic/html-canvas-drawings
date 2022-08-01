'use strict';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = 900;
const height = canvas.height = 900;

ctx.fillRect(0, 0, width, height);
ctx.translate(width / 2, height / 2);

//Real algorithm variables
let stepCounter = 1;
let pixel = 20;
let blocks = width / pixel;
let state = 1;
let x = 0; let y = 0;
let numSteps = 2;
let increment = false;
let i = 1;
//let prevX = 0; let prevY = 0;

ctx.fillStyle = 'white';

window.requestAnimationFrame(draw());


function draw() {
    if (i <= (blocks - 1) * (blocks - 1)) {
        if (isPrime(i)) {
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, (Math.PI / 180), 360);
            //ctx.rect(x-pixel/2, y-pixel/2, pixel, pixel);
            ctx.fillStyle = "limegreen";
            ctx.fill();
            ctx.closePath();
        }


        if (i == numSteps && increment == false) {
            if (state < 4) state++;
            else if (state == 4) state = 1;
            increment = true;
            numSteps += stepCounter;
        } else if (i == numSteps && increment == true) {
            stepCounter++;
            numSteps += stepCounter;
            if (state < 4) state++;
            else if (state == 4) state = 1;
            increment = false;
        }

        //change the state
        switch (state) {
            case 1:
                x += pixel;
                break;
            case 2:
                y -= pixel;
                break;
            case 3:
                x -= pixel;
                break;
            case 4:
                y += pixel;
                break;
        }
        /*
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 1;
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.stroke();
        */
        window.requestAnimationFrame(draw);
        i++;
    }
}

function isPrime(num) {
    if (num == 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i == 0) return false;
    }
    return true;
}