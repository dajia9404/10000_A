// TypeScript file
module game
{
    export class ReadyLayer extends egret.DisplayObjectContainer implements IDispose
    {
        private _scoreText:egret.TextField;
        public constructor()
        {
            super();
            this.addEventListener(EventConst.ADDEDSTAGE,this.onAddToStageHandler,this);
        }
        public updateScore():void
        {
            this._scoreText.text = AppData.Score+"";
        }
        private onAddToStageHandler(evt:egret.Event):void
        {
            this._scoreText =  GText.createText('',40);
            this._scoreText.stroke = 2;
            this._scoreText.strokeColor = 0x000000;

            this._scoreText.x = 0;
            this._scoreText.y = 0;
            this.addChild(this._scoreText);
        }

        public dispose():void
        {
            this._scoreText.text = '';
        }
    }
}