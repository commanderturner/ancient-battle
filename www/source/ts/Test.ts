export default class Test {
    name: string
    constructor(myname: string){
        this.name = myname;
    }
    showsomething(){
        let mydiv = <HTMLDivElement>document.getElementById('test');
        mydiv.innerHTML = this.name;
    }
}