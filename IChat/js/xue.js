(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
    window.requestAnimationFrame = requestAnimationFrame;
})();

(function() {
    var flakes = [],
        canvas = document.getElementById("Snow"), //鐢诲竷ID锛屼笌涓婁竴姝ュ垱寤虹殑鐢诲竷瀵瑰簲
        ctx = canvas.getContext("2d"),
        flakeCount = 200,  //闆姳鏁伴噺锛屾暟鍊艰秺澶ч洩鑺辨暟閲忚秺澶�
        mX = -100,
        mY = -100;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function snow() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < flakeCount; i++) {
            var flake = flakes[i],
                x = mX,
                y = mY,
                minDist = 150,  //闆姳璺濈榧犳爣鎸囬拡鐨勬渶灏忓€硷紝灏忎簬杩欎釜璺濈鐨勯洩鑺卞皢鍙楀埌榧犳爣鐨勬帓鏂�
                x2 = flake.x,
                y2 = flake.y;

            var dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y)),
                dx = x2 - x,
                dy = y2 - y;

            if (dist < minDist) {
                var force = minDist / (dist * dist),
                    xcomp = (x - x2) / dist,
                    ycomp = (y - y2) / dist,
                    deltaV = force / 2;

                flake.velX -= deltaV * xcomp;
                flake.velY -= deltaV * ycomp;

            } else {
                flake.velX *= .98;
                if (flake.velY <= flake.speed) {
                    flake.velY = flake.speed
                }
                flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
            }

            ctx.fillStyle = "rgba(255,255,255," + flake.opacity + ")";  //闆姳棰滆壊
            flake.y += flake.velY;
            flake.x += flake.velX;

            if (flake.y >= canvas.height || flake.y <= 0) {
                reset(flake);
            }

            if (flake.x >= canvas.width || flake.x <= 0) {
                reset(flake);
            }

            ctx.beginPath();
            ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
            ctx.fill();
        }
        requestAnimationFrame(snow);
    };

    function reset(flake) {
        flake.x = Math.floor(Math.random() * canvas.width);
        flake.y = 0;
        flake.size = (Math.random() * 3) + 2;  //鍔犲彿鍚庨潰鐨勫€硷紝闆姳澶у皬锛屼负鍩哄噯鍊硷紝鏁板€艰秺澶ч洩鑺辫秺澶�
        flake.speed = (Math.random() * 1) + 0.5;  //鍔犲彿鍚庨潰鐨勫€硷紝闆姳閫熷害锛屼负鍩哄噯鍊硷紝鏁板€艰秺澶ч洩鑺遍€熷害瓒婂揩
        flake.velY = flake.speed;
        flake.velX = 0;
        flake.opacity = (Math.random() * 0.5) + 0.3;  //鍔犲彿鍚庨潰鐨勫€硷紝涓哄熀鍑嗗€硷紝鑼冨洿0~1
    }

    function init() {
        for (var i = 0; i < flakeCount; i++) {
            var x = Math.floor(Math.random() * canvas.width),
                y = Math.floor(Math.random() * canvas.height),
                size = (Math.random() * 3) + 2,  //鍔犲彿鍚庨潰鐨勫€硷紝闆姳澶у皬锛屼负鍩哄噯鍊硷紝鏁板€艰秺澶ч洩鑺辫秺澶�
                speed = (Math.random() * 1) + 0.5,  //鍔犲彿鍚庨潰鐨勫€硷紝闆姳閫熷害锛屼负鍩哄噯鍊硷紝鏁板€艰秺澶ч洩鑺遍€熷害瓒婂揩
                opacity = (Math.random() * 0.5) + 0.3;  //鍔犲彿鍚庨潰鐨勫€硷紝涓哄熀鍑嗗€硷紝鑼冨洿0~1

            flakes.push({
                speed: speed,
                velY: speed,
                velX: 0,
                x: x,
                y: y,
                size: size,
                stepSize: (Math.random()) / 30 * 1,  //涔樺彿鍚庨潰鐨勫€硷紝闆姳妯Щ骞呭害锛屼负鍩哄噯鍊硷紝鏁板€艰秺澶ч洩鑺辨í绉诲箙搴﹁秺澶э紝0涓虹珫鐩翠笅钀�
                step: 0,
                angle: 180,
                opacity: opacity
            });
        }

        snow();
    };

    document.addEventListener("mousemove", function(e) {
        mX = e.clientX,
        mY = e.clientY
    });
    window.addEventListener("resize", function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    init();
})();