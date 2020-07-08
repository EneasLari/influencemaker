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
        this.FontSize=document.getElementById(FontSizeId).options[document.getElementById(FontSizeId).selectedIndex].value;
        this.FontType=document.getElementById(FontyTypeId).options[document.getElementById(FontyTypeId).selectedIndex].value;
        this.ColorWell=document.getElementById(ColorWellId)
        if(!this.ImageCanvasElement || !this.TextCanvasElement || !this.TextInputElement){
            throw "Element not Found or Loaded"
        }
        this.Startup();
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

    TextInputHandler(){
        console.log("TEXTINPUTHANDLER")
        
        var canvas = this.TextCanvasElement
        canvas.width=this.ImageCanvasElement.width;
        canvas.height=this.ImageCanvasElement.height;
        console.log(canvas.height)
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
        ctx.fillText(this.Text,canvas.width/2,canvas.height/2);
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
    ChangeColor(t){
        this.TextInputHandler();
    }

    Startup() {
        console.log("STARTUP")
        this.ColorWell.value = "#000000";
        //this.ColorWell.addEventListener("input", this.ChangeColor, false);
        //this.ColorWell.addEventListener("change", this.ChangeColor, false);
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
        ctxtodownload.fillText(this.Text,newcanvas.width/2,newcanvas.height/2);

        var image = newcanvas.toDataURL("image/png",1);
        var link = document.createElement('a');
        link.download = "socialmedia.png";
        link.href = image;
        link.click();
        newcanvas.width=0;
        newcanvas.height=0;
    }

}