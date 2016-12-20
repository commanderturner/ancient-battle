import Battle from './Battle';
import Test from './Test';

export default class App  {
    public test: any;
    public battle: IBattle;
    // Application Constructor
    constructor(){
        this.bindEvents();
    }

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    private bindEvents() {
        document.addEventListener('deviceready', () => {this.onDeviceReady()}, false);
    }
    
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    private onDeviceReady() {
        this.receivedEvent('deviceready');
        // alert('This TypeScript application is ready to rock.') 
        this.battle = new Battle();
        document.getElementById('deviceready').style.display = "none";
        // this.test = new Test('rumplestiltskin');
        // this.test.showsomething();
    }  

    // Update DOM on a Received Event
    private receivedEvent(id: string) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }    

}
