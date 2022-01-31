window.addEventListener("load", function () {

    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let timeToNextRaven = 0;
    let ravenInterval = 500;
    let lastTime = 0;
    let gameFrame = 0;
    let score = 0;
    ctx.font = "40px Georgia";
    let mouseX = 0;
    let mouseY = 0;
    let gameSpeed = 3;


    let ravens = [];
    let frameX = 0;

    class Raven {
        constructor() {
            this.spriteWidth = 271;
            this.spriteHeight = 194;
            this.sizeModifier = Math.random() * 0.2 + 0.3; //Making the ravens different sizes
            this.width = this.spriteWidth * this.sizeModifier;
            this.height = this.spriteHeight * this.sizeModifier;
            this.x = canvas.width;
            this.y = Math.random() * (canvas.height - this.height - 100);
            this.directionX = Math.random() * 5 + gameSpeed;
            this.directionY = Math.random() * 5 - 2.5;
            this.markedForDeletion = false;
            this.markedForShot = false;
            this.image = new Image();
            this.image.src = "Characters/raven.png"



        }
        update() {
            if (this.y < 0 || this.y > canvas.height - this.height - 100) {
                this.directionY = this.directionY * -1;
            }

            this.x -= this.directionX;
            this.y += this.directionY;
            if (this.x < 0 - this.width) {
                this.markedForDeletion = true;
            }
        }

        draw() {
            ctx.fillStyle = "black"
            ctx.drawImage(this.image, frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
        }
    }
    //Collision




    function detectCollision() {
        for (let i = 0; i < ravens.length; i++) {
            if (clickSwitch == true && mouseX < ravens[i].x + ravens[i].width && mouseX > ravens[i].x &&
                mouseY < ravens[i].y + ravens[i].height && mouseY > ravens[i].y) {
                ravens[i].markedForShot = true;
                score++

            } else {

            }



        }
    }




    const raven = new Raven();
    let staggerFrames = 4;
    //BG Image---------------------------------------------

    const bgImage = new Image();
    bgImage.src = "Backgrounds/background.png"

    //Score----------------------------------------------

    function handleScore() {
        ctx.fillStyle = "black";
        ctx.fillText("Score: " + score, 50, 50);


    }
    // ---------REQUEST ANIMATION FRAME LOOP ------------------------------------

    function handleRavens() {
        if (timeToNextRaven > ravenInterval) {
            ravens.push(new Raven());
            timeToNextRaven = 0;
        }
        for (let i = 0; i < ravens.length; i++) {
            ravens[i].draw();
            ravens[i].update();
        }
        for (let i = 0; i < ravens.length; i++) {
            if (ravens[i].markedForDeletion || ravens[i].markedForShot) {
                ravens.splice(i, 1)
            }
        }

    }
    let clickSwitch = false;


    window.addEventListener("mousedown", function (e) {
        clickSwitch = true;
        mouseX = e.x;
        mouseY = e.y;
        this.setTimeout(function () { clickSwitch = false }, 50)
    })
    window.addEventListener("mouseup", function () {
        clickSwitch = false;
    })


    function animate(time) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);


        //Background-----------------------
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

        gameFrame++;
        const delta = time - lastTime;
        lastTime = time;
        timeToNextRaven += delta;
        handleRavens();

        // console.log(ravens.length);
        // [..ravens].forEach(object => object.update());
        // [..ravens].forEach(object => object.draw());
        //ravens =ravens.filter(object => !object.markedForDeletion);

        requestAnimationFrame(animate);


        //FrameX loop
        if (gameFrame % staggerFrames == 0) {
            if (frameX < 5) frameX++;
            else frameX = 0;
        }


        handleScore();
        detectCollision();



    }


    animate(0);











})





