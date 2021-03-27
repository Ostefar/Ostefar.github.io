window.addEventListener('load', () => {
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext('2d');

    //sizing
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    //variables
    let isPainting = false;


    colorInput = document.getElementById("pLine");


    function Pstart(e){
        isPainting = true;
        draw(e)
    }

    function Pfinish(){
        isPainting = false;
        ctx.beginPath();
    }

    function draw(e){
        if(!isPainting) return;
        ctx.lineWidth = rangeslider.value;
        ctx.lineCap = 'round';

        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.strokeStyle = colorInput.value;
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);


    }

    const bClear = document.getElementById("bClear")

bClear.addEventListener("click", () => {

ctx.clearRect(0, 0, canvas.width, canvas.height);
});

    //eventlisteners
    canvas.addEventListener('mousedown', Pstart);
    canvas.addEventListener('mouseup', Pfinish);
    canvas.addEventListener('mousemove', draw);


});

var rangeslider = document.getElementById("myRange");
output.innerHTML = rangeslider.value;
  
rangeslider.oninput = function() {
  output.innerHTML = this.value;

}





