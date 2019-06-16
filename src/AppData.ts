// TypeScript file
module game
{
    export class AppData
    {

        private static _score = 0;
        public static get Score() : number 
        {
            return this._score;
        }
        public static set Score(v : number) 
        {
            this._score = v;
        }

        public static blockWidth = 0 ;              //方块宽度
        public static blockHeight = 0;              //方块高度
        public static fallSpeed = 1;                //移动速度
        public static GAMEWIDTH = 640;
        public static GAMEHEIGHT = 1136;
    }
}