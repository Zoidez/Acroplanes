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
        var line = new createjs.Shape();
        line.name = 'line';
        line.width = 120;
        line.height = 1;
        line.x = settings.plane.width/2;
        line.y = settings.plane.height/2
        line.regX = 0;
        line.regY = 0;
        line.graphics = new createjs.Graphics();
        line.graphics.beginFill('green');
        line.graphics.drawRect(settings.plane.width/2, settings.plane.height/2, 120, 1);
        this.addChild(line);
        
        var line2 = new createjs.Shape();
        line2.name = 'line2';
        line2.width = 1;
        line2.height = 120;
        line2.x = settings.plane.width/2;
        line2.y = settings.plane.height/2
        line2.regX = 0;
        line2.regY = 0;
        line2.graphics = new createjs.Graphics();
        line2.graphics.beginFill('red');
        line2.graphics.drawRect(settings.plane.width/2, settings.plane.height/2, 1, 120);
        this.addChild(line2);
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
        //----Testing UI----//
        this.getChildByName('line').rotation = -this.velRotation;
        this.getChildByName('line2').rotation = -this.velRotation;
        //this.getChildByName('line').scaleX = (this.velX/this.getChildByName('line').scaleX);
        //this.getChildByName('line2').scaleY = this.velY;
        
        this.vel = Math.sqrt(Math.pow(this.velX, 2) + Math.pow(this.velY, 2));
        //this.velRotation = -Math.atan2(this.velX, this.velY)*180/Math.PI+90;
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
            this.vel+=/*((Math.cos(this.cursorRotation * (Math.PI/180))) * */0.05//);
        }
        else if(this.vel>0) this.vel-=0.5; //Suspends the plane in the air.
        //Velocity Y
        this.velY = ((Math.sin(this.velRotation * (Math.PI/180))) * this.vel);
        if(this.y+this.height<settings.height-settings.ground.height){
            //if(this.vel<2){
                //this.velY += (this.velX<0.1) ? 5 : 0.5*(1/this.velX);
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
        }
        this.x+=this.velX;
        
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