// Stores winning possibilities - eventually use db instead
let options = ["200", "20", "0", "100", "50", "0", "100", "200", "500","40", "0", "400"];

//TODO - beautify records show- eventually use db instead
let records = [];

//TODO - beautify total show- eventually use db instead
let totalBets = [];

// Total amount (current value) 
let total = [100];

// Background music
let audio = new Audio('wheelOfFortune.mp3');

// Spin sound
let audio1 = new Audio('bikewreck.mp3');

let startAngle = 0;

// Division of circle dividede by length of array 
let arc = Math.PI / (options.length / 2);
let spinTimeout = null;

let spinArcStart = 10;
let spinTime = 0;
let spinTimeTotal = 0;
  
  
  // Get the canvas element
  const canvas = document.getElementById("canvas");
  // Return a two dimensional drawing context
  const ctx = canvas.getContext("2d");

  // Start game
  drawWheel();
  audio.play();
  
  

    //colors the wheel
    function getColor(item) {
        if(item % 2 == 0){
            return '#7ed7f2';
        } else {
            return '#7a8ef0';
        }
    }
    
    // draw the wheel and insert options from option array
    function drawWheel() {
        if (canvas.getContext) {
            //mainWheel
            var outsideRadius = 230;
            var textRadius = 175;
            var insideRadius = 75;
            
            ctx.clearRect(0,0,700,700);
            ctx.strokeStyle = "lightgrey";
            ctx.lineWidth = 1;

            ctx.font = 'bold 16px Helvetica, Arial';

            for(var i = 0; i < options.length; i++) {
                //getColor()
                var angle = startAngle + i * arc;
                ctx.fillStyle = getColor(i);

                //cones
                ctx.beginPath();
                ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
                ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
                ctx.stroke();
                ctx.fill();

                //connect as circle
                ctx.save();

                //text style
                ctx.shadowOffsetX = -1;
                ctx.shadowOffsetY = -1;
                ctx.shadowBlur = 0;
                ctx.shadowColor = "rgb(220,220,220)";
                ctx.fillStyle = "black";
                // text placement
                ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius,
                    250 + Math.sin(angle + arc / 2) * textRadius);
                ctx.rotate(angle + arc / 2 + Math.PI / 2);

                //get text from array
                var text = options[i];
                if (parseInt(options[i]) >= 100) {
                    ctx.font = 'bold 26px Helvetica, Arial';
                } else if (parseInt(options[i]) >= 200) {
                    ctx.font = 'bold 28px Helvetica, Arial';
                } else if (parseInt(options[i]) >= 300) {
                    ctx.font = 'bold 32px Helvetica, Arial';
                } else if (parseInt(options[i]) >= 400) {
                    ctx.font = 'bold 38px Helvetica, Arial';
                }
                if (parseInt(options[i]) >= 100){
                    ctx.fillText(text + "%", -25, -10);
                } else {
                    ctx.fillText(text + "%", -10, -10);
                }
                //connect as circle
                ctx.restore();
            }
            //Arrow
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.moveTo(250 - 5, 250 - (outsideRadius + 15));
            ctx.lineTo(250 + 5, 250 - (outsideRadius + 15));
            ctx.lineTo(250 + 5, 250 - (outsideRadius - 7));
            ctx.lineTo(250 + 17, 250 - (outsideRadius - 7));
            ctx.lineTo(250 + 0, 250 - (outsideRadius - 28));
            ctx.lineTo(250 - 17, 250 - (outsideRadius - 7));
            ctx.lineTo(250 - 5, 250 - (outsideRadius - 7));
            ctx.lineTo(250 - 5, 250 - (outsideRadius + 5));
            ctx.fill();
        }
    }
    /* Start spinning cyclys of the next 4 functions spin() initiates rotateWheel(), which calls easeOut()
    and initiates stopRotateWheel()
    */
    function spin() {
        spinAngleStart = Math.random() * 10 + 10;
        spinTime = 0;
        spinTimeTotal = Math.random() * 3 + 4 * 1000;
        audio1.play();
        rotateWheel();
    }
    // rotates the wheel, calls stopRotateWheel and drawWheel() to refresh for next spin.
    function rotateWheel() {
        spinTime += 20;
        if(spinTime >= spinTimeTotal) {
            stopRotateWheel();
            return;
        }
        let spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
        startAngle += (spinAngle * Math.PI / 180);
        drawWheel();
        spinTimeout = setTimeout('rotateWheel()', 20);
    }
    /* Stops the wheel, calculates winnings and draws the amount at the center of the circle.
     -- TODO --
        make changes to winning variable so calculations will be more precise
        make exact calculations on winning rates 
        add tests for calculations
        maybe a test function that runs the code ex. amount of times and prints the values
     */
    function stopRotateWheel() {
        clearTimeout(spinTimeout);
        let degrees = startAngle * 180 / Math.PI + 90;
        let arcd = arc * 180 / Math.PI;
        let index = Math.floor((360 - degrees % 360) / arcd);
        ctx.save();
        ctx.font = 'bold 30px Helvetica, Arial';
        // initiates and uses variables for calculation, array storage and html view
        let text = options[index];
        let bet = playerBet.value;
        let totalBet = bet;
        let winnings = (bet/100*text) - bet;
        records.push(" " + winnings);
        totalBets.push(" " + totalBet);
        total.push(total.slice(-1)[0]+(winnings));
        document.getElementById("total").innerHTML = total.slice(-1)[0] + "$"; 
        document.getElementById("winnings").innerHTML = records.slice(Math.max(records.length - 5, 0)) + "$";
        document.getElementById("totalBets").innerHTML = totalBets.slice(Math.max(totalBets.length - 5, 0)) + "$"; 
        //print winnings on wheel
        ctx.fillText(winnings + "$", 250 - ctx.measureText(winnings).width / 2, 250 + 10);
        ctx.restore();
    }
    // any parameters to be set to real values when called upon in rotateWheel()    
    function easeOut(t, b, c, d) {
        let ts = (t/=d)*t;
        let tc = ts*t;
        return b+c*(tc + -3*ts + 3*t);
    }

    function pauseMusic(){
        audio.pause();
    }
    // to retrieve and display chozen amount from slider
    function sliderChange(val) {
        document.getElementById('output').innerHTML = val + "$";
    }
    document.getElementById('playerBet').value = 0;


