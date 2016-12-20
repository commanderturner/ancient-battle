import Warrior from './Warrior';
// let NUMBER_OF_WARRIORS: number = 5;

export default class Battle implements IBattle {
    number_of_warriors: number;
    battlefield_width: number;
    battlefield_height: number;
    warriors: Array<Warrior>;

    constructor() {
        this.number_of_warriors = 10;
        this.battlefield_height = 500;
        this.battlefield_width = 500;
        //this.warriors = [];
        this.generateWarriors(5, 'close');

        let canvas = <HTMLCanvasElement>document.getElementById('canvas');

        canvas.width = 500;
        canvas.height = 500;
        if (canvas.getContext) {
            // Clear the canvas
            var context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
        
        // document.body.addEventListener('keydown', (event)=> {
        //     var info = this.meta(event);
        //     if (info) {
        //         e.preventDefault();
        //         this.animate(info[0], this.warrior[info[0]] + info[1], 1000);
        //     };
        // });

        // document.body.addEventListener('keyup', function (e) {
        //     var info = this.meta(e);

        //     if (info) {
        //         e.preventDefault();
        //         this.animate(info[0], this.warrior[info[0]], 1000);
        //     };
        // });

        // Start the redrawing process
        //this.render();


        if (this.warriors && this.warriors.length) {
            this.warriors.forEach(warrior => {
                // Draw the warrior
                warrior.drawWarrior(context, warrior);
            });
            // Redraw
            // requestAnimationFrame(this.render);
        }
    }



    generateWarriors(unitNumberColumns: number, order: Order) {
        let operatingSpace: number = order === 'close' ? 12 : 18;
        this.warriors = [];
        let row: number = 1;
        let column : number = 1;
        for (var i = 1; i < this.number_of_warriors + 1; i++) {
            if (column > unitNumberColumns) {
                column = 1;
                row ++;
            } 
            let warrior = new Warrior(operatingSpace * column, operatingSpace * row, 'green');
            this.warriors.push(warrior);
            column ++;
        }
    }


    requestAnimationFrame() {
        // window.requestAnimationFrame ||
        //     (<any>window).webkitRequestAnimationFrame ||
        //     (<any>window).mozRequestAnimationFrame ||
        //     window.msRequestAnimationFrame ||
        //     (<any>window).oRequestAnimationFrame ||
        //     function (callback: any) {
        //         return setTimeout(callback, 1);
        //     };
    }


    render() {
        // let canvas = <HTMLCanvasElement>document.getElementById('canvas');
        // canvas.width = 5000;
        // canvas.height = 5000;
        // if (canvas.getContext) {
        //     // Clear the canvas
        //     var context = canvas.getContext('2d');
        //     context.clearRect(0, 0, canvas.width, canvas.height);
        //     if (this.warriors && this.warriors.length) {
        //         this.warriors.forEach(warrior => {
        //             // Draw the warrior
        //             context.beginPath();
        //             context.arc(warrior.x, warrior.y, warrior.physicalRadius, 0, 2 * Math.PI, false);
        //             context.fillStyle = warrior.fillColour;
        //             context.fill();
        //             context.lineWidth = 5;
        //             context.strokeStyle = '#003300';
        //             context.stroke();
        //             context.closePath();
        //         });
        //         // Redraw
        //         requestAnimationFrame(this.render);
        //     }
        // }
    }

    animate(property: string, value: number, duration: number) {
        // let warrior = <any>this.warriors[0];
        // // The calculations required for the step function
        // var start = new Date().getTime();
        // var end = start + duration;
        // var currentValue = warrior[property];
        // var distance = value - currentValue;

        // var step = function () {
        //     // Get our current progres
        //     var timestamp = new Date().getTime();
        //     var progress = Math.min((duration - (end - timestamp)) / duration, 1);

        //     // Update the warriors's property
        //     warrior[property] = currentValue + (distance * progress);

        //     // If the animation hasn't finished, repeat the step.
        //     if (progress < 1) requestAnimationFrame(step);
        // };

        // // Start the animation
        // return step();
    };

    //animate('x', 0, 1000);

    meta(event: any): Array<any> {

        return [];


    }
}
