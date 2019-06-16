// TypeScript file
module game
{
    /**
     * - 初始生成背景
     */
    export class GameLayer extends egret.DisplayObjectContainer implements IDispose
    {
        private _blockGroups:BlockGroup[] = [];
        public constructor()
        {
            super();
            this.addEventListener(EventConst.ADDEDSTAGE,this.onAddToStageHandler,this);
        }

        private onAddToStageHandler(evt:egret.Event):void
        {
            this.init();
        }
        private onEnterFrameHandler(time:number):void
        {
            if(App.Inst._state == GameState.operate)
            {
                this.fall(time);
            }
        }
        private fall(time:number):void
        {
            if(this._blockGroups)
            {
                for(let i=0,len =this._blockGroups.length;i<len;i++)
                {   
                    this._blockGroups[i].fall(time);
                }
            }
        }
        private init():void
        {
            this.firstSpawnBlock();
        }

        private firstSpawnBlock():void
        {
            this.clearGroups();
            for(let i=0;i<5;i++)
            {
                let group = new BlockGroup();
                this.addChild(group);
                this._blockGroups.push(group);
                group.spawn(0,  (i-1)*AppData.blockHeight,true,-AppData.blockHeight);
            }
        }   
        private clearGroups():void
        {
            if(this._blockGroups)
            {
                for(let i=0,len=this._blockGroups.length;i<len;i++)
                {
                    this._blockGroups[i].dispose();
                    this._blockGroups[i].parent.removeChild(this._blockGroups[i]);
                }
                this._blockGroups = [];
            }
        }
        public setState(state:GameState):void
        {
            if(App.Inst._state == GameState.operate)
            {
                App.Inst.addDisp({func:this.onEnterFrameHandler,thisObj:this});
            }
            else
            {
                App.Inst.removeDisp({func:this.onEnterFrameHandler,thisObj:this});
            }
        }

        public dispose():void
        {
            this.clearGroups();
            App.Inst.removeDisp({func:this.onEnterFrameHandler,thisObj:this});
        }
    }
}