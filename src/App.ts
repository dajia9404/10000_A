// TypeScript file

enum GameState
{
    ready,          //准备
    operate,        //游戏
}

class App extends egret.DisplayObjectContainer
{
    public static Inst:App = null;
    public _state = GameState.ready;
    private _readyLayer = new game.ReadyLayer();
    private _gameLayer = new game.GameLayer();
    private _deltaTime = 0;

    private onEnterFrameEventDisp:{func:Function,thisObj:any}[] = [];         //所有回调事件

    public addDisp(evt:{func:Function,thisObj:any}):void
    {
        let idx = -1;
        for(let i=0,len=this.onEnterFrameEventDisp.length;i<len;i++)
        {
            if(this.onEnterFrameEventDisp[i].func==evt.func && this.onEnterFrameEventDisp[i].thisObj == evt.thisObj)
            {
                idx = i;
                break;
            }
        }
        if(idx==-1)
        {
            this.onEnterFrameEventDisp.push(evt);
        }
    }

    public removeDisp(evt:{func:Function,thisObj:any}):void
    {
        let idx = -1;
        for(let i=0,len=this.onEnterFrameEventDisp.length;i<len;i++)
        {
            if(this.onEnterFrameEventDisp[i].func==evt.func && this.onEnterFrameEventDisp[i].thisObj == evt.thisObj)
            {
                idx = i;
                break;
            }
        }
        if(idx>=0)
        {
            this.onEnterFrameEventDisp.splice(idx,1);
        }
    }

    public constructor()
    {
        super();
        App.Inst = this;
        this.addEventListener(game.EventConst.ADDEDSTAGE,this.onAddToStageHandler,this);
        this.addEventListener(game.EventConst.ENTERFRAME,this.onEnterFrameHandler,this);
    }

    private onEnterFrameHandler(evt:egret.Event):void
    {
        if(this.onEnterFrameEventDisp)
        {
            let now = egret.getTimer();
            let time = this._deltaTime;
            let pass = now - time;
            for(let i=0,len=this.onEnterFrameEventDisp.length;i<len;i++)
            {
                this.onEnterFrameEventDisp[i].func.call(this.onEnterFrameEventDisp[i].thisObj,pass);
            }
            this._deltaTime = egret.getTimer();
        }
    }

    private onAddToStageHandler(evt:egret.Event):void
    {            
        //入口
        game.AppData.blockWidth = game.AppData.GAMEWIDTH /4;
        game.AppData.blockHeight=game.AppData.GAMEHEIGHT/4;
        this._deltaTime = egret.getTimer();
        this.start();
    }

    private init():void
    {
        if(this._readyLayer && this._readyLayer.parent)
        {
            this._readyLayer.dispose();
            this._readyLayer.parent.removeChild(this._readyLayer);
        }
        if(this._gameLayer && this._gameLayer.parent)
        {
            this._gameLayer.dispose();
            this._gameLayer.parent.removeChild(this._gameLayer);
        }
    }

    private start():void
    {
        this.init();
        this.setState(GameState.ready);
        setTimeout(()=> {
            this.setState(GameState.operate);
        }, 10000);
    }
    public addScore():void
    {   
        ++game.AppData.Score;
        this._readyLayer.updateScore();
    }

    public setState(state:GameState):void
    {
        this._state = state;
        if(this._state == GameState.ready)
        {
            if(this._gameLayer && !this._gameLayer.parent)
            {
                this.addChild(this._gameLayer);
            }
            if(this._readyLayer && !this._readyLayer.parent)
            {
                this.addChild(this._readyLayer);
            }
        }

        if(this._state == GameState.operate)
        {
            this._gameLayer.setState(this._state);
        }
    }
    public lost():void
    {
        this.setState(GameState.ready);
        setTimeout(()=> {
            this.start();
        }, 1000);
    }
}
