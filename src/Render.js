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

        //Stuff to make this work as a test
        let dark = true;
        let game = {
            size: [30, 30]
        }
        const scale = Math.min(canvas.width * 0.8 / game.size[0], canvas.height * 0.8 / game.size[1]);

        function render() {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // draw grid
            ctx.strokeStyle = dark ? "#666" : "#ccc";
            ctx.lineWidth = 1;
            let draw_cell_direction = false;
            let d = 0.15;
            for (let x=0; x<=game.size[0]; ++x) {
                ctx.lineWidth = x%2 ? 0.8 : 2;
                ctx.beginPath();
                ctx.moveTo(x*scale, 0);
                if (draw_cell_direction && x > 0 && x < game.size[0]) {
                for (let y=0; y<game.size[1]; ++y) {
                    ctx.lineTo(x*scale, (y+0.5-d)*scale);
                    ctx.lineTo((x+(y%2?d:-d))*scale, (y+0.5)*scale);
                    ctx.lineTo(x*scale, (y+0.5+d)*scale);
                }
                }
                ctx.lineTo(x*scale, game.size[1]*scale);
                ctx.stroke();
            }
            for (let y=0; y<=game.size[1]; ++y) {
                ctx.lineWidth = y%2 ? 0.8 : 2;
                ctx.beginPath();
                ctx.moveTo(0, y*scale);
                if (draw_cell_direction && y > 0 && y < game.size[1]) {
                for (let x=0; x<game.size[0]; ++x) {
                    ctx.lineTo((x+0.5-d)*scale, y*scale);
                    ctx.lineTo((x+0.5)*scale, (y+(x%2?-d:d))*scale);
                    ctx.lineTo((x+0.5+d)*scale, y*scale);
                }
                }
                ctx.lineTo(game.size[0]*scale, y*scale);
                ctx.stroke();
            }
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