function fixCanvas(){
    canvas = document.getElementById("canvas");
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
}
window.onresize = fixCanvas;
//----The property 'width' is not built-in to the container and other objects of createjs. Assign the '.width' property to each object created manually.----//
//----These are the general settings for objects----//
var settings = new Object();
settings.cloud = new Object();
settings.ground = new Object();
settings.plane = new Object();
settings.width = 5000;
settings.height = 4500;
settings.ground.width = settings.width;
settings.ground.height = 500;
settings.cloud.width = 1000;
settings.cloud.height = 300;
settings.cloud.minVel = 0;
settings.cloud.maxVel = 0.5;
settings.cloud.minHeight = settings.height - settings.ground.height - 1000;
settings.cloud.maxHeight = -300;
settings.cloud.maxCount = 50;
settings.cloud.count = 0;
settings.plane.width = 60;
settings.plane.height = 13;
settings.plane.maxVel = 15;
//----End of settings----//

//----Assets are to keep the objects you need at hand----//
//----For more information, refer to the mind map----//
var assets = new Object();
assets.mouse = new Object();
assets.clouds = [];
assets.tickArray = [];  //Careful, no check for the presence of the tick function. You gotta make sure you don't push an object without tick() in here.
assets.mouse.x = 0;
assets.mouse.y = 0;

function init(){
    fixCanvas();
    loadAssets();

    stage = new createjs.Stage('canvas');
    assets.stage = stage;
    var world = new World();
    stage.addChild(world);
    assets.world = world;
    assets.tickArray.push(world);
    
    var plane = new Plane();
    world.addChild(plane);
    assets.plane = plane;
    console.log(plane);
    
    stage.on('stagemousemove', function(e){
        assets.mouse.x = e.localX;
        assets.mouse.y = e.localY;
        //console.log('x: ' + assets.mouse.x + 'y: ' + assets.mouse.y);
    });
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener('tick', tick);
    function tick(e){
        for(var i = 0; i<assets.clouds.length; i++){
            assets.clouds[i].tick();
        }
        for(var i = 0; i<assets.tickArray.length; i++){
            assets.tickArray[i].tick();
        }
        stage.update();
    }
}
function loadAssets(){
    assets.groundImage = new Image();
    assets.atmosphereImage = new Image();
    assets.cloudImage = [];
    assets.cloudImage[0] = new Image();
    assets.cloudImage[1] = new Image();
    assets.cloudImage[2] = new Image();
    assets.cloudImage[3] = new Image();
    assets.planeImage = new Image();
    assets.groundImage.onload = onGroundImageLoad;
    assets.groundImage.isLoaded = false;
    assets.atmosphereImage.onload = onAtmosphereImageLoad;
    assets.cloudImage[0].onload = onCloudImageLoad;
    assets.cloudImage[1].onload = onCloudImageLoad;
    assets.cloudImage[2].onload = onCloudImageLoad;
    assets.cloudImage[3].onload = onCloudImageLoad;
    assets.planeImage.onload = onPlaneImageLoad;
    assets.cloudImage[0].isLoaded = false;
    assets.cloudImage[1].isLoaded = false;
    assets.cloudImage[2].isLoaded = false;
    assets.cloudImage[3].isLoaded = false;
    assets.groundImage.src = "./img/world_ground.png";
    assets.atmosphereImage.src = "./img/world_atmosphere.png";
    assets.cloudImage[0].src = './img/world_cloud1.png';
    assets.cloudImage[1].src = './img/world_cloud2.png';
    assets.cloudImage[2].src = './img/world_cloud3.png';
    assets.cloudImage[3].src = './img/world_cloud4.png';
    assets.planeImage.src = './img/plane.png';
}
function onGroundImageLoad(e){
    var groundShape = new createjs.Shape();
    groundShape.width = settings.ground.width;
    groundShape.height = settings.ground.height;
    groundShape.graphics = new createjs.Graphics();
    groundShape.graphics.beginBitmapFill(this);
    groundShape.graphics.drawRect(0, 0, settings.ground.width, settings.ground.height);
    
    var ground = new Ground(groundShape);
    stage.getChildByName('world').addChild(ground);
    assets.ground = ground;
    stage.update();
}
function onAtmosphereImageLoad(e){
    var atmosphereShape = new createjs.Shape();
    atmosphereShape.graphics = new createjs.Graphics();
    atmosphereShape.graphics.beginBitmapFill(this);
    atmosphereShape.graphics.drawRect(0, 0, settings.width, settings.height-settings.ground.height);
    atmosphereShape.name = 'atmosphere';
    
    stage.getChildByName('world').addChild(atmosphereShape);
    assets.groundImage.isLoaded = true;
    stage.update();
    
}
function onCloudImageLoad(e){
    this.isLoaded = true;
    if(assets.cloudImage[0].isLoaded && assets.cloudImage[1].isLoaded && assets.cloudImage[2].isLoaded && assets.cloudImage[3].isLoaded) initializeClouds();
}
function initializeClouds(){
    var x, y;
    for(var i=0; i<settings.cloud.maxCount; i++){
        x = Math.floor(Math.random()*(settings.width+settings.cloud.width+settings.cloud.width)-settings.cloud.width);
        y = Math.floor(Math.random()*(settings.cloud.minHeight+settings.cloud.height)-settings.cloud.height);
        var cloud = new Cloud(x, y);
        stage.getChildByName('world').addChild(cloud);
        settings.cloud.count++;
    }
}
function onPlaneImageLoad(e){
    var planeBitmap = new createjs.Bitmap(assets.planeImage);
    var plane = new Plane(planeBitmap);
    stage.getChildByName('world').addChild(plane);
}
function onMouseMove(e){
    //stage.getChildByName('world').vel.x = e.rawX - canvas.width/
}