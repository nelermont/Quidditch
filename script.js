const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

const harry = new Image();
const bg = new Image();
const fg = new Image();
const slytherin = new Image();
const bob = new Image();
const hufflepuff = new Image();
const ravenclaw = new Image();
const snitchImg = new Image();
const griffindor = new Image();

const fly = new Audio();
const score_audio = new Audio();
const th = new Audio();
const win = new Audio();

const imgRandom = [slytherin, hufflepuff, ravenclaw];
const randomIndex = Math.floor(Math.random() * 3);

let rival = [];
let team = [];
let bobPoint = [];

let score = 0;
let second = 0;

let xPos = 210;
let yPos = 250;
let grav = 0.2;

harry.src = "Images/222.png";
bg.src = "Images/bg.jpeg";
fg.src = "Images/trava4.png";
bob.src = "Images/bob2.png";
slytherin.src = "Images/333.png";
hufflepuff.src = "Images/Hufflepuff.png";
ravenclaw.src = "Images/Ravenclaw.png";
snitchImg.src = "Images/snitch.png";
griffindor.src = "Images/222.png";

fly.src = "Audio/22.mp3";
score_audio.src = "Audio/3.mp3";
th.src = "Audio/1.mp3";
win.src = "Audio/win.mp3";

window.onkeydown = function (event) {
   if (event.keyCode == 38) {
      yPos -= 30;
   };
   if (event.keyCode == 40) {
      yPos += 30;
   };
   if (event.keyCode == 39) {
      xPos += 30;
   };
   if (event.keyCode == 37) {
      xPos -= 30;
   };
   fly.play();
};

let snitch = [];
snitch[0] = {
   x: Math.floor(Math.random() * 1000),
   y: Math.floor(Math.random() * 500)
}

function creatPos(item) {
   item[0] = {
      x: cvs.width,
      y: Math.floor(Math.random() * 500)
   }
}

creatPos(rival);
creatPos(team);
creatPos(bobPoint);

function ss(mas, img) {
   for (let i = 0; i < mas.length; i++) {
      ctx.drawImage(img, mas[i].x, mas[i].y);
      mas[i].x--;
      if (mas[i].x == 400) {
         mas.push({
            x: cvs.width,
            y: Math.floor(Math.random() * 500)
         });
      }
   };
}

function restart() { location.reload();}

function draw() {
  // th.play();
   ctx.drawImage(bg, 0, 0);
   
   for (let i = 0; i < snitch.length; i++) {
      ctx.drawImage(snitchImg, snitch[i].x, snitch[i].y, 20, 10);
      snitch[i].x--;
      second++;
      if (second == 40) {
         snitch.pop();
         snitch.push({
            x: Math.floor(Math.random() * 900),
            y: Math.floor(Math.random() * 500),
         });
      }
      if (second == 50) { second = false; }
      if ((score === 150) || (xPos + harry.width >= snitch[i].x
         && xPos <= snitch[i].x
         && yPos <= snitch[i].y
         && yPos + harry.width >= snitch[i].y)) {
               th.pause();
               win.play();
               score = 150;
               setTimeout(restart, 11000);
               ctx.fillText("Griffindor Win!!!", 350, cvs.height - 250);
               
      }
   };

   for (let i = 0; i < team.length; i++) {
      ctx.drawImage(griffindor, team[i].x, team[i].y);
      team[i].x--;
      if (team[i].x == 400) {
         team.push({
            x: cvs.width,
            y: Math.floor(Math.random() * 500)
         });
      }
   };

   for (let i = 0; i < bobPoint.length; i++) {
      ctx.drawImage(bob, bobPoint[i].x, bobPoint[i].y);
      bobPoint[i].x--;
      if (bobPoint[i].x == 300) {
         bobPoint.push({
            x: cvs.width,
            y: Math.floor(Math.random() * 500)
         });
      }

      if ((xPos + harry.width >= bobPoint[i].x
         && xPos <= bobPoint[i].x + bob.width
         && yPos <= bobPoint[i].y + bob.height
         && yPos + harry.width >= bobPoint[i].y)) {
         score++;
         score_audio.play();
         bobPoint.pop();
         bobPoint.push({
            x: cvs.width,
            y: Math.floor(Math.random() * 500)
         });
      }
   }

   for (let i = 0; i < rival.length; i++) {
      ctx.drawImage(imgRandom[randomIndex], rival[i].x, rival[i].y);
      rival[i].x--;
      if (rival[i].x == 625) {
         rival.push({
            x: cvs.width,
            y: Math.floor(Math.random() * 500)
         });
      }
      if ((xPos + harry.width >= rival[i].x
         && xPos <= rival[i].x + slytherin.width
         && yPos <= rival[i].y + slytherin.height
         && yPos + harry.width >= rival[i].y) || (yPos + harry.height >= cvs.height - fg.height)) {

       restart();
       
      }
   }

   ctx.drawImage(fg, 0, cvs.height - fg.height);
   ctx.drawImage(harry, xPos, yPos);

   yPos += grav;
   xPos += grav;

   ctx.fillStyle = "white";
   ctx.font = "20px Verdana";
   ctx.fillText("Score: " + score, 10, cvs.height - 20);
   if (imgRandom[randomIndex] == hufflepuff) {
      ctx.fillText("Gryffindor VS  " + 'Hufflepuff', 200, cvs.height - 20);
   }
   if (imgRandom[randomIndex] == slytherin) {
      ctx.fillText("Gryffindor VS  " + 'Slytherin', 200, cvs.height - 20);
   }
   if (imgRandom[randomIndex] == ravenclaw) {
      ctx.fillText("Gryffindor VS  " + 'Ravenclaw', 200, cvs.height - 20);
   }
   requestAnimationFrame(draw);
}

griffindor.onload = draw;