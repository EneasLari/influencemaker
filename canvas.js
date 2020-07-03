class Canvas{
    constructor(ImageCanvasId,TextCanvasId,TextInputId) {

        this.ImageCanvasId = ImageCanvasId;
        this.TextCanvasId = TextCanvasId;
        this.TextInputId = TextInputId;

        this.ImageCanvasElement=document.getElementById(ImageCanvasId);
        this.TextCanvasElement=document.getElementById(TextCanvasId);
        this.TextInputElement=document.getElementById(TextCanvasId);

        console.log(this.TextCanvasElement);
        if(!this.ImageCanvasElement || !this.TextCanvasElement || !this.TextInputElement){
            throw "No Canvas Element Found or Loaded"
        }
        this.LoadedImage=null;
        this.Text="";
        
    }

    DrawBackGround(image){
        this.ImageCanvasElement.width= image.width;
        this.ImageCanvasElement.height = image.height;
        //var context=this.SetupCanvas(this.ImageCanvasElement)
        var context= this.ImageCanvasElement.getContext('2d');
        console.log(this);
        context.mozImageSmoothingEnabled = false;  // firefox
        context.imageSmoothingEnabled = false;
        console.log(image)
        context.drawImage(image,0,0);
        this.LoadedImage=image;
    }

    TextInputHandler(){
        var canvas = this.TextCanvasElement
        canvas.width=this.ImageCanvasElement.width;
        canvas.height=this.ImageCanvasElement.height;
        var ctx = this.SetupCanvas(canvas);
        if(this.TextInputElement.value){
            this.Text=this.TextInputElement.value;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // if(colorWell.value){
        //     ctx.fillStyle = colorWell.value;
        // }
        ctx.font =fontsize+ " "+fontType;
        ctx.textAlign = "center";
        ctx.fillText(this.Text,canvas.width/2,canvas.height/2);
    }
    
    LoadImage(event){
        var img = new Image();
        var that=this;//Here this refers to object itself,we assign it to a variable
        img.onload = function(){
            that.DrawBackGround(img);
        }
        img.src = URL.createObjectURL(event.target.files[0]);
    }

    SetupCanvas(canvas) {
        // Get the device pixel ratio, falling back to 1.
        var dpr = window.devicePixelRatio || 2;
        
        // Get the size of the canvas in CSS pixels.
        var rect = canvas.getBoundingClientRect();
        // Give the canvas pixel dimensions of their CSS
        // size * the device pixel ratio.
        if(rect.width!=0 || rect.height!=0){
          canvas.width = rect.width * dpr;
          canvas.height = rect.height * dpr;

          canvas.style.width = `${dpr*canvas.width}px`;
          canvas.style.height = `${dpr*canvas.height}px`

        }
        var ctx = canvas.getContext('2d');
        // Scale all drawing operations by the dpr, so you
        // don't have to worry about the difference.
        console.log("DPR="+dpr)
        ctx.scale(dpr, dpr);
        return ctx;
      }

}