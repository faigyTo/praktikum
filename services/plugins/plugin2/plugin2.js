export default class plugin2 {
     
     constructor({x,y}){
        this.x=x;
        this.y=y
     }
     execute () {
        console.log('plugin2 is runing!!!!!');
        return { type: "", candele: { open: "", close: "" }, }
    }
     
}
