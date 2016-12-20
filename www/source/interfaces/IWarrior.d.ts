/**
 * A warrior contains all the characteristics needed to draw a warrior on the battlefield
 * 
 * @interface Warrior
 */
interface IWarrior {
    /**
     * an id to reference the warrior with
     * 
     * @type {number}
     * @memberOf Warrior
     */
    id: number;
    /**
     * the x location on the canvas the warrior is centered on
     * 
     * @type {number}
     * @memberOf Warrior
     */
    x: number;
    /**
     * the y location on the canvas the warrior is centered on
     * 
     * @type {number}
     * @memberOf Warrior
     */
    y: number;
    /**
     * the radius the physical dimensions of the warrior take up
     * 
     * @type {number}
     * @memberOf Warrior
     */
    physicalRadius: number;
    /**
     * the radius a warrior has to fight in
     * 
     * @type {number}
     * @memberOf Warrior
     */
    operatingRadius: number;
    /**
     * the colour of the warrior
     * 
     * @type {string}
     * @memberOf Warrior
     */
    fillColour: string;
    /**
     * returns the properties required to draw a circle representing the physical dimensions of the warrior on the battlefield
     * 
     * 
     * @memberOf Warrior
     */
    getWarriorBodyAsCircle(): IWarriorBodyAsCircle
}
