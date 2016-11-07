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
        this.width = settings.plane.width/2;
        this.height = settings.plane.height/2;
        this.regX = settings.plane.width/2;
        this.regY = settings.plane.height/2;
        this.x = Math.floor(Math.random()*(settings.width-1000));
        this.y = 3977;
        this.vel = 0;
        this.velX = 0;
        this.velY = -0;
        this.velRotation = 0;
        this.cursorRotation = 0;
        this.engineOn = false;
        this.gravity = {
            y : 0,
            apply : function(){
                
            }
        }
        this.gravity.apply();
        //this.addEventListener("click", function(event) { alert("clicked"); })
        this.addChild(planeBitmap);
        assets.tickArray.push(this);
    }
    Plane.prototype.tick = function(){
        //----Rotating the plane----//
        this.cursorRotation = -Math.atan2(assets.mouse.x - this.x-assets.world.x, assets.mouse.y - this.y-assets.world.y)*180/Math.PI+90;
        
        if(Math.abs(this.cursorRotation-this.velRotation)>180){
            if(this.cursorRotation>this.velRotation) this.velRotation+=360;
            else this.velRotation-=360;
        }
        if(this.vel>1){
            this.velRotation = (this.velRotation + ((this.cursorRotation-this.velRotation)*(this.vel/(settings.plane.maxVel+200))));
             console.log('+vel: ' + this.vel + '\nrotation: ' + this.cursorRotation + '\nvelRotation: ' + this.velRotation);
        } else {
            this.velRotation = (this.velRotation + ((this.cursorRotation-this.velRotation)*(1/settings.plane.maxVel)));
            console.log('-vel: ' + this.vel + '\nrotation: ' + this.cursorRotation + '\nvelRotation: ' + this.velRotation);
        }
        this.rotation = this.velRotation;
        //----Moving the plane----//
        //Vector velocity
        if(this.vel<settings.plane.maxVel && this.engineOn){
            this.vel+=/*((Math.cos(this.cursorRotation * (Math.PI/180))) * */0.3//);
        }
        else if(this.vel>0) this.vel-=0.5;
        //Velocity Y
        this.velY = ((Math.sin(this.velRotation * (Math.PI/180))) * this.vel);
        if(this.y+this.height<settings.height-settings.ground.height){
            //if(this.vel<2){
                this.velY += (this.vel<1) ? this.velY : 1;
            //}
        }
        else if(this.velY>0){
            this.velY = 0;
            //this.vel = ((Math.cos(this.velRotation * (Math.PI/180))) * this.vel);
        }
        this.y+=this.velY;
        //Velocity X
        if(this.x < settings.width-settings.plane.width/2 && this.x+settings.plane.width/2 > 0){
            this.velX = ((Math.cos(this.velRotation * (Math.PI/180))) * this.vel);
            this.x+=this.velX;
        }
        //Moving the world with the plane
        assets.world.x = canvas.width/2 - this.x;
        assets.world.y = canvas.height/2 - this.y;
        if(assets.world.x>0) assets.world.x = 0;
        if(assets.world.y>0) assets.world.y = 0;
        if(assets.world.x<canvas.width-settings.width) assets.world.x = canvas.width-settings.width;
        if(assets.world.y<canvas.height-settings.height) assets.world.y = canvas.height-settings.height;
        //console.log(((assets.mouse.x-this.x-assets.world.x)/(assets.mouse.y - this.y-assets.world.y+(assets.mouse.x-this.x-assets.world.x))));
        if(assets.plane.engineOn){
            //console.log('Engine on!');
            if(Math.sqrt(Math.pow(this.velX, 2) + Math.pow(this.velY, 2)) < settings.plane.maxVel){
                this.velX += Math.cos(this.velRotation/180)*0.3;
                if(Math.sqrt(Math.pow(this.velX, 2) + Math.pow(this.velY, 2)) > settings.plane.takeOffVel){
                    //this.velY += Math
                }
            }
        }
        else{
            //console.log('Engine off!');
            //if(Math.sqrt(Math.pow(this.velX, 2) + Math.pow(this.velY, 2)) < settings.plane.maxVel){
            if(this.velX>0){
                this.velX -= 0.05;   //Air drag. later, if needed in other places, put under settings.
            }
            //}
        }
    }
    function applyGravity(){console.log('gravity applied at: ' + this.gravity.y);}
    window.Plane = Plane;
} (window));