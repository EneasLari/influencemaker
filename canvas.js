class Canvas{
    constructor(ImageCanvasId,TextCanvasId,TextInputId,FontyTypeId,FontSizeId,ColorWellId) {

        this.ImageCanvasId = ImageCanvasId;
        this.TextCanvasId = TextCanvasId;
        this.TextInputId = TextInputId;
        this.ImageCanvasElement=document.getElementById(ImageCanvasId);
        this.TextCanvasElement=document.getElementById(TextCanvasId);
        this.TextInputElement=document.getElementById(TextInputId);
        this.LoadedImage=null;
        this.Text="";
        this.TextClientX=null;
        this.TextClientY=null;
        this.TextX=null;
        this.TextY=null;
        this.FontSize=document.getElementById(FontSizeId).options[document.getElementById(FontSizeId).selectedIndex].value;
        this.FontType=document.getElementById(FontyTypeId).options[document.getElementById(FontyTypeId).selectedIndex].value;
        this.ColorWell=document.getElementById(ColorWellId)
        if(!this.ImageCanvasElement || !this.TextCanvasElement || !this.TextInputElement){
            throw "Element not Found or Loaded"
        }
        this.Startup();
        var that=this;
        this.TextCanvasElement.addEventListener('mousedown', function(e) {
            const rect = this.getBoundingClientRect()
            console.log(rect);
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top;
            that.TextClientX=e.clientX;
            that.TextClientY=e.clientY;
            that.TextX=x;
            that.TextY=y;
            console.log("Ax: " + x + " Ay: " + y)
            that.TextInputHandler()
        })
    }

    DrawBackGround(image){
        this.ImageCanvasElement.width= image.width;
        this.ImageCanvasElement.height = image.height;
        //var context=this.SetupCanvas(this.ImageCanvasElement)
        var context= this.ImageCanvasElement.getContext('2d');
        context.mozImageSmoothingEnabled = false;  // firefox
        context.imageSmoothingEnabled = false;
        context.drawImage(image,0,0);
        this.LoadedImage=image;
    }

    TextInputHandler(x,y){
        console.log("TEXTINPUTHANDLER")
        
        var canvas = this.TextCanvasElement
        console.log(this.ImageCanvasElement)
        canvas.width=this.ImageCanvasElement.getBoundingClientRect().width;
        canvas.height=this.ImageCanvasElement.getBoundingClientRect().height;
        
        //console.log("IMAGE CANVAS ELEMENT :"+canvas.width+" "+canvas.height );
        //console.log("Dimensions=>Image:"+this.ImageCanvasElement.width+"x"+ this.ImageCanvasElement.height+" Text"+this.TextCanvasElement.width+"x"+ this.TextCanvasElement.height)
        var ctx =canvas.getContext('2d');//this.SetupCanvas(canvas);
        //console.log("IMAGE CANVAS ELEMENT (AFTER):"+canvas.width+" "+canvas.height );
        if(this.TextInputElement.value){
            this.Text=this.TextInputElement.value;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if(this.ColorWell.value){
            ctx.fillStyle = this.ColorWell.value;
        }

        var fontBase = 800
        var size=this.FontSize.split("px")[0]
        var ratio = size / fontBase;
        var cSize = canvas.width * ratio;

        ctx.font =cSize+ "px "+this.FontType;
        ctx.textAlign = "center";
        if(this.TextX && this.TextY){
            ctx.fillText(this.Text,this.TextX,this.TextY);
        }else{
            ctx.fillText(this.Text,canvas.width/2,canvas.height/2);
        }
        
    }
    
    LoadImage(event){
        var img = new Image();
        var that=this;//Here this refers to object itself,we assign it to a variable
        img.onload = function(){
            that.DrawBackGround(img);
            that.TextInputHandler();
        }
        img.src = URL.createObjectURL(event.target.files[0]);
    }


    ChangeColor(t){
        this.TextInputHandler();
    }

    Startup() {
        console.log("STARTUP")
        this.ColorWell.value = "#000000";
        this.ColorWell.select();
    }

    ChangeFontType(){
        console.log(event.target.value);
        this.FontType=event.target.value;
        this.TextInputHandler();
    }

    ChangeFontSize(){
        console.log(event.target.value);
        this.FontSize=event.target.value
        this.TextInputHandler();
    }

    GetCursorPosition(canvas, event) {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        console.log("x: " + x + " y: " + y)
    }

    Download(event){
        var newcanvas =document.getElementById("downloading")
        if(this.LoadedImage!=null){
            newcanvas.width=this.LoadedImage.width
            newcanvas.height=this.LoadedImage.height
        }
        var ctxtodownload=newcanvas.getContext('2d');//this.SetupCanvas(newcanvas)
        if(this.LoadedImage){
            ctxtodownload.drawImage(this.LoadedImage,0,0);
        }
        if( this.ColorWell.value){
            ctxtodownload.fillStyle = this.ColorWell.value;
        }

        var fontBase = 800
        var size=this.FontSize.split("px")[0]
        var ratio = size / fontBase;
        var cSize = newcanvas.width * ratio;


        ctxtodownload.font=cSize+"px "+this.FontType;
        ctxtodownload.textAlign="center";
        var x=this.TextX*(newcanvas.width/(this.TextCanvasElement.width))
        var y=this.TextY*(newcanvas.height/(this.TextCanvasElement.height))

        // var rect = newcanvas.getBoundingClientRect()
        // console.log(rect);
        // var x = this.TextClientX - rect.left
        // var y = this.TextClientY - rect.top;

        console.log("x: " + x + " y: " + y)
        ctxtodownload.fillText(this.Text,x,y);

        var image = newcanvas.toDataURL("image/png",1);
        var link = document.createElement('a');
        link.download = "socialmedia.png";
        link.href = image;
        link.click();
        newcanvas.width=0;
        newcanvas.height=0;
    }

    SetupCanvas(canvas,scaleCanvas) {
        // Get the device pixel ratio, falling back to 1.
        
        var dpr = window.devicePixelRatio || 2;
        
        // Get the size of the canvas in CSS pixels.
        var rect = canvas.getBoundingClientRect();
        // Give the canvas pixel dimensions of their CSS
        // size * the device pixel ratio.

        // if((rect.width!=0 || rect.height!=0)){
        //   canvas.width = rect.width * dpr;
        //   canvas.height = rect.height * dpr;

        //   canvas.style.width = `${dpr*canvas.width}px`;
        //   canvas.style.height = `${dpr*canvas.height}px`

        // }
        var ctx = canvas.getContext('2d');
        // Scale all drawing operations by the dpr, so you
        // don't have to worry about the difference.
        //console.log("DPR="+dpr)
        ctx.scale(dpr, dpr);
        return ctx;
    }

}