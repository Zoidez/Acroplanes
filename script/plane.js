(function(window){
    function Plane(planeBitmap){
        this.initialize(planeBitmap);
    }
    Plane.prototype = new createjs.Container();

    Plane.prototype.container_initialize = Plane.prototype.initialize;

    Plane.prototype.initialize = function(planeBitmap) {
        this.container_initialize();
        this.name = 'plane';
        this.setBounds(0, 0, settings.plane.width, settings.plane.height);
        this.width = settings.plane.width;
        this.height = settings.plane.height;
        this.x = Math.floor(Math.random()*(settings.width-1000));
        this.y = 3977;
        this.velX = 0;
        this.velY = 0;
        this.addChild(planeBitmap);
    }
    Plane.prototype.tick = function(){
        if(assets.groundImage.isLoaded){
            var ground = assets.ground;
            var relativeToGround = this.localToLocal(assets.ground);
            if(!ground.hitTest(relativeToGround.x, relativeToGround.y)){
                this.y+=this.vel;
                if(this.vel<15) this.vel++;
            }
        }
    }
    window.Plane = Plane;
} (window));