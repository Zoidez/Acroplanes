(function(window){
    function TestUI(){
        this.initialize();
    }
    TestUI.prototype = new createjs.Container();
    
    TestUI.prototype.container_initialize = TestUI.prototype.initialize;
    
    TestUI.prototype.initialize = function(){
        this.container_initialize();
        this.name = 'TestUI';
        
        var line = new createjs.Shape();
        line.name = 'xLline';
        line.x = settings.plane.width/2;
        line.y = settings.plane.height;
        line.width = 120;
        line.height = 1;
        line.graphics = new createjs.Graphics();
        line.graphics.beginFill('green');
        line.graphics.drawRect(0, 0, 120, 1);
        line.set = set;
        this.addChild(line);
        this.xLine = line;
        
        var line2 = new createjs.Shape();
        line2.name = 'yLine';
        line2.x = settings.plane.width/2;
        line2.y = settings.plane.height;
        line2.width = 1;
        line2.height = 120;
        line2.graphics = new createjs.Graphics();
        line2.graphics.beginFill('red');
        line2.graphics.drawRect(0, 0, 1, 120);
        line2.set = set;
        this.addChild(line2);
        this.yLine = line2;
    }
    function set(lvl, width){
        if(width) this.scaleX = (lvl/this.width)*4;
        else this.scaleY = (lvl/this.height)*4;
    }
    window.TestUI = TestUI;
} (window));