let PHYSICAL_RADIUS: number = 2; // 2 cubits or 90cm
let OPERATING_RADIUS: number = 6; //2 cubits either side in normal phalanx marching order

export default class Warrior implements IWarrior {
    public id: number;
    public x: number;
    public y: number;
    public physicalRadius: number;
    public operatingRadius: number;
    public fillColour: string;
    constructor(x: number, y: number, fillColour?: string ){
        if (!x || !y){
            return;
        }
        this.x = x;
        this.y = y;

        this.fillColour = fillColour || '#000000';
        this.operatingRadius = OPERATING_RADIUS;
        this.physicalRadius = PHYSICAL_RADIUS;

    }
    public getWarriorBodyAsCircle(): IWarriorBodyAsCircle {
        return {
            x: this.x,
            y: this.y,
            radius: this.physicalRadius,
            startAngle: 0,
            endAngle: 2 * Math.PI,
            counterClockwise: false
        }

    }
    public drawWarrior(context: CanvasRenderingContext2D, warrior: IWarrior) {
            context.beginPath();
            context.arc(warrior.x, warrior.y, warrior.physicalRadius, 0, 2 * Math.PI, false);
            context.fillStyle = 'green';
            context.fill();
            context.lineWidth = 5;
            context.strokeStyle = '#003300';
            context.stroke();
            context.closePath();
    }
}
