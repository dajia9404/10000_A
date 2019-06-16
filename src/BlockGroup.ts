// TypeScript file
module game
{
    export class BlockGroup extends egret.DisplayObjectContainer implements IDispose
    {
        private _blocks:egret.Sprite[]=[];
        private _startPosY = 0;
        public constructor()
        {
            super();
            this.addEventListener(EventConst.ADDEDSTAGE,this.onAddToStageHandler,this);
        }

        private onAddToStageHandler(evt:egret.Event):void
        {

        }

        /**生成一组方块 */
        public spawn(x:number = 0,y:number = 0-AppData.blockHeight,isAllWhite = false,startPosY:number =0 ):void
        {
            this._startPosY = startPosY;
            this.y = y;
            let color = [0,0,0,0];
            if(!isAllWhite)
            {
                let blackIdx = Math.floor(Math.random()*4%4);
                color[blackIdx] = 1 ;
            }   
            for(let i=0;i<4;i++)
            {
                let sp = new egret.Sprite();
                sp.touchEnabled = true;
                this.drawRect(sp.graphics,i*AppData.blockWidth,0,AppData.blockWidth,AppData.blockHeight,color[i]);
                this._blocks.push(sp);
                sp['data'] = {color:color[i],touchState:0,x:i*AppData.blockWidth};
                sp.addEventListener(EventConst.TOUCHTAP,this.onBlockClickHanler,this);
                this.addChild(sp);
            }
        }

        private onBlockClickHanler(evt:egret.TouchEvent):void
        {
            let block:egret.Sprite = evt.currentTarget;
            let color  = block['data'].color;
            let touchState = block['data'].touchState;
            if(color == 0 || touchState == 1)      
            {
                App.Inst.lost();         return;
            }
            App.Inst.addScore();
            block['data'].touchState = 1;
            this.drawRect(block.graphics,block['data'].x,block.y,AppData.blockWidth,AppData.blockHeight,0);
        }

        private drawRect(graphics:egret.Graphics,x,y,width,height,type:number):void
        {
            graphics.clear();
            graphics.beginFill(type == 0?0xffffff:0x000000);
            graphics.drawRect(x,y,AppData.blockWidth,AppData.blockHeight);
            this.drawLine(graphics,x,y,AppData.blockWidth,AppData.blockHeight);
            graphics.endFill();
        }

        private drawLine(graphics:egret.Graphics,x,y,width,height):void
        {
            graphics.lineStyle(1,0x000000);
            graphics.moveTo(x,y);
            graphics.lineTo(x + AppData.blockWidth,y);
            graphics.lineTo(x + AppData.blockWidth,y + AppData.blockHeight);
            graphics.lineTo(x,y + AppData.blockHeight);
            graphics.lineTo(x,y);
        }

        private reset():void
        {
            this.y = this._startPosY;
            if(this._blocks)
            {
                let color = [0,0,0,0];
                let blackIdx = Math.floor(Math.random()*4%4);
                color[blackIdx] = 1;
                for(let i=0,len=this._blocks.length;i<len;i++)
                {
                    this._blocks[i]['data'] = {color:color[i],touchState:0,x:i*AppData.blockWidth};
                    this.drawRect(this._blocks[i].graphics,i*AppData.blockWidth,0,AppData.blockWidth,AppData.blockHeight,color[i]);
                }
            }
        }
        /**下落 */
        public fall(time:number):void
        {
            if(this.y>AppData.GAMEHEIGHT)
            {
                this.reset();
            }
            this.y += 10;
        }

        public dispose():void
        {
            this.removeEventListener(EventConst.ADDEDSTAGE,this.onAddToStageHandler,this);
        }
    }
}