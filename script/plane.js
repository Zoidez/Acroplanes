(function(window){
    function Plane(planeBitmap){
        this.initialize(planeBitmap);
    }
    Plane.prototype = new createjs.Container();

    Plane.prototype.container_initialize = Plane.prototype.initialize;

    Plane.prototype.initialize = function(planeBitmap) {
        //var childContainer = new createjs.Container();
        //childContainer.regX = settings.plane.width/2;
        this.container_initialize();
        this.name = 'plane';
        this.setBounds(0, 0, settings.plane.width, settings.plane.height);
        this.width = settings.plane.width/2;
        this.height = settings.plane.height/2;
        this.regX = settings.plane.width/2;
        this.regY = settings.plane.height/2;
        this.x = Math.floor(Math.random()*(settings.width-1000));
        this.y = 3977;
        this.velX = 0;
        this.velY = -0;
        //this.graphics = new createjs.Graphics();
        //this.graphics.drawRect(0, 0, 1000, 1000);
        //this.graphics.beginBitmapFill(assets.groundImage);
        this.addChild(planeBitmap);
        assets.tickArray.push(this);
    }
    Plane.prototype.tick = function(){
        if(this.y+this.height<settings.height-settings.ground.height){
            this.y+=this.velY;
            if(this.velY<settings.plane.maxVel) this.velY+=0.3;
        }
        else{
            this.velY = 0;
        }
        assets.world.x = canvas.width/2 - this.x;
        assets.world.y = canvas.height/2 - this.y;
        if(assets.world.x>0) assets.world.x = 0;
        if(assets.world.y>0) assets.world.y = 0;
        if(assets.world.x<canvas.width-settings.width) assets.world.x = canvas.width-settings.width;
        if(assets.world.y<canvas.height-settings.height) assets.world.y = canvas.height-settings.height;
        console.log('x: ' + (assets.mouse.x - this.x-assets.world.x) + 'y: ' + (assets.mouse.y - this.y-assets.world.y));
        this.rotation = -Math.atan2(assets.mouse.x - this.x-assets.world.x, assets.mouse.y - this.y-assets.world.y)*180/Math.PI+90;
    }
    window.Plane = Plane;
} (window));