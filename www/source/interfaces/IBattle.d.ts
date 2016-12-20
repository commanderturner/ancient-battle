interface IBattle {
    number_of_warriors: number;
    battlefield_width: number;
    battlefield_height: number;
    warriors: Array<IWarrior>;
    generateWarriors(unitNumberColumns: number, order: Order):void;
    requestAnimationFrame(): void;
    render(): void;
    animate(property: string, value: number, duration: number): void;
    meta(event: any): Array<any>;
}