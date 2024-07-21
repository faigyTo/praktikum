export default class plugin1 {
     constructor(x){
        this.x=x;
     }
     
     execute () {
        console.log('plugin1 is runing!!!!!');
        return { type: "", candele: { open: "", close: "" }, }
    }
     
}
