// TypeScript file
module game
{
    export class GText
    {
        /**创建一个文本 */
        public static createText(text:string,size:number = 20):egret.TextField
        {
            let field = new egret.TextField();
            field.text = text;
            field.size = size;
            return field;
        }
    }
}