const Render = {
    start: function() {
        // Create canvas element
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")
        canvas.id = "gameArea";
        canvas.style.position = "fixed";
        canvas.style.top = "50%";
        canvas.style.left = "50%";
        canvas.style.transform = "translate(-50%, -50%)";
        canvas.style.border = "5px solid #333333";
        document.body.appendChild(canvas);
        
        // background color 
        document.body.style.backgroundColor = "black";

        Render.resizeCanvas(canvas);

        function render() {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            requestAnimationFrame(render);
        }
        render();
    },

    resizeCanvas: function(canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        EventBus.publish("ResizeCanvas", canvas);
    },

};

EventBus.subscribe("GameStart", Render.start);