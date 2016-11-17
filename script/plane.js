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
        //this.addEventListener("click", function(event) { alert("clicked"); })
        var test = new TestUI();
        test.name = 'test';
        test.x = settings.plane.width/2;
        test.y = settings.plane.height/2;
        this.addChild(test);
        this.addChild(planeBitmap);
        assets.tickArray.push(this);
        this.gravity = new Force();
        this.gravity.apply = function(plane){
            plane.velY += 0.1*((settings.plane.maxVel - plane.velX)/settings.plane.maxVel);
            console.log("velX: " + plane.velX);
        }
    }
    Plane.prototype.tick = function(){
        //----Testing UI----//
        this.getChildByName('test').rotation = -this.velRotation;
        //this.getChildByName('line2').rotation = -this.velRotation;
        this.getChildByName('test').xLine.set(this.velX, true);
        this.getChildByName('test').yLine.set(this.velY, false);
        
        this.vel = Math.sqrt(Math.pow(this.velX, 2) + Math.pow(this.velY, 2));
        //this.velRotation = -Math.atan2(this.velX, this.velY)*180/Math.PI+90;
        //----Rotating the plane----//
        this.cursorRotation = -Math.atan2(assets.mouse.x - this.x-assets.world.x, assets.mouse.y - this.y-assets.world.y)*180/Math.PI+90;
        this.velRotation = -Math.atan2(this.velX, this.velY)*180/Math.PI+90;
        
        if(Math.abs(this.cursorRotation-this.velRotation)>180){
            if(this.cursorRotation>this.velRotation) this.velRotation+=360;
            else this.velRotation-=360;
        }
        if(this.vel>1){
            this.velRotation = (this.velRotation + ((this.cursorRotation-this.velRotation)*(this.vel*this.vel/(settings.plane.maxVel+1000))));
            //this.velRotation = (this.velRotation + (this.cursorRotation-this.velRotation)*0.7*(this.vel/(settings.plane.maxVel+200)));
             //console.log('+vel: ' + this.vel + '\nrotation: ' + this.cursorRotation + '\nvelRotation: ' + this.velRotation);
        } else {
            this.velRotation = (this.velRotation + (this.cursorRotation-this.velRotation)*(this.vel/1000));
            console.log('-vel: ' + this.vel + '\nrotation: ' + this.cursorRotation + '\nvelRotation: ' + this.velRotation);
        }
        //console.log('Math.atan2 = ' + (-Math.atan2(this.velX, this.velY)*180/Math.PI+90))
        this.rotation = this.velRotation;
        //----Moving the plane----//
        //Vector velocity
        if(this.vel<settings.plane.maxVel && this.engineOn){
            this.vel+=0.05;
        }
        else if(this.vel>0) this.vel-=0.5; //Suspends the plane in the air.
        //Velocity Y
        this.velY = ((Math.sin(this.velRotation * (Math.PI/180))) * this.vel);
        if(this.y+this.height<settings.height-settings.ground.height){
            //if(this.vel<2){
                var pitch = Math.abs(Math.cos(this.velRotation * (Math.PI/180)));
                //this.velY += (pitch>1) ? 1/pitch : 1/pitch;
                this.gravity.apply(this);
            //}
        }
        else if(this.velY>0){
            this.velY = 0;
            this.y = settings.height-settings.ground.height-this.height;
            //this.vel = ((Math.cos(this.velRotation * (Math.PI/180))) * this.vel);
        }
        this.y+=this.velY;
        //Velocity X
        this.velX = ((Math.cos(this.velRotation * (Math.PI/180))) * this.vel);
        if((this.x < settings.width-settings.plane.width/2 || this.velX<0) && (this.x-settings.plane.width/2 > 0 || this.velX>0)){
            this.x+=this.velX;        
        }
        
        //Moving the world with the plane
        assets.world.x = canvas.width/2 - this.x;
        assets.world.y = canvas.height/2 - this.y;
        if(assets.world.x>0) assets.world.x = 0;
        if(assets.world.y>0) assets.world.y = 0;
        if(assets.world.x<canvas.width-settings.width) assets.world.x = canvas.width-settings.width;
        if(assets.world.y<canvas.height-settings.height) assets.world.y = canvas.height-settings.height;
    }
    function applyGravity(){console.log('gravity applied at: ' + this.gravity.y);}
    window.Plane = Plane;
} (window));