(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var Battle_1 = require('./Battle');
var App = (function () {
    // Application Constructor
    function App() {
        this.bindEvents();
    }
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    App.prototype.bindEvents = function () {
        var _this = this;
        document.addEventListener('deviceready', function () { _this.onDeviceReady(); }, false);
    };
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    App.prototype.onDeviceReady = function () {
        this.receivedEvent('deviceready');
        // alert('This TypeScript application is ready to rock.') 
        this.battle = new Battle_1.default();
        document.getElementById('deviceready').style.display = "none";
        // this.test = new Test('rumplestiltskin');
        // this.test.showsomething();
    };
    // Update DOM on a Received Event
    App.prototype.receivedEvent = function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        console.log('Received Event: ' + id);
    };
    return App;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
},{"./Battle":2}],2:[function(require,module,exports){
"use strict";
var Warrior_1 = require('./Warrior');
// let NUMBER_OF_WARRIORS: number = 5;
var Battle = (function () {
    function Battle() {
        this.number_of_warriors = 10;
        this.battlefield_height = 500;
        this.battlefield_width = 500;
        //this.warriors = [];
        this.generateWarriors(5, 'close');
        var canvas = document.getElementById('canvas');
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
            this.warriors.forEach(function (warrior) {
                // Draw the warrior
                warrior.drawWarrior(context, warrior);
            });
        }
    }
    Battle.prototype.generateWarriors = function (unitNumberColumns, order) {
        var operatingSpace = order === 'close' ? 12 : 18;
        this.warriors = [];
        var row = 1;
        var column = 1;
        for (var i = 1; i < this.number_of_warriors + 1; i++) {
            if (column > unitNumberColumns) {
                column = 1;
                row++;
            }
            var warrior = new Warrior_1.default(operatingSpace * column, operatingSpace * row, 'green');
            this.warriors.push(warrior);
            column++;
        }
    };
    Battle.prototype.requestAnimationFrame = function () {
        // window.requestAnimationFrame ||
        //     (<any>window).webkitRequestAnimationFrame ||
        //     (<any>window).mozRequestAnimationFrame ||
        //     window.msRequestAnimationFrame ||
        //     (<any>window).oRequestAnimationFrame ||
        //     function (callback: any) {
        //         return setTimeout(callback, 1);
        //     };
    };
    Battle.prototype.render = function () {
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
    };
    Battle.prototype.animate = function (property, value, duration) {
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
    ;
    //animate('x', 0, 1000);
    Battle.prototype.meta = function (event) {
        return [];
    };
    return Battle;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Battle;
},{"./Warrior":3}],3:[function(require,module,exports){
"use strict";
var PHYSICAL_RADIUS = 2; // 2 cubits or 90cm
var OPERATING_RADIUS = 6; //2 cubits either side in normal phalanx marching order
var Warrior = (function () {
    function Warrior(x, y, fillColour) {
        if (!x || !y) {
            return;
        }
        this.x = x;
        this.y = y;
        this.fillColour = fillColour || '#000000';
        this.operatingRadius = OPERATING_RADIUS;
        this.physicalRadius = PHYSICAL_RADIUS;
    }
    Warrior.prototype.getWarriorBodyAsCircle = function () {
        return {
            x: this.x,
            y: this.y,
            radius: this.physicalRadius,
            startAngle: 0,
            endAngle: 2 * Math.PI,
            counterClockwise: false
        };
    };
    Warrior.prototype.drawWarrior = function (context, warrior) {
        context.beginPath();
        context.arc(warrior.x, warrior.y, warrior.physicalRadius, 0, 2 * Math.PI, false);
        context.fillStyle = 'green';
        context.fill();
        context.lineWidth = 5;
        context.strokeStyle = '#003300';
        context.stroke();
        context.closePath();
    };
    return Warrior;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Warrior;
},{}],4:[function(require,module,exports){
"use strict";
var App_1 = require('./App');
var app = new App_1.default();
},{"./App":1}]},{},[4,1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzb3VyY2UvdHMvQXBwLnRzIiwic291cmNlL3RzL0JhdHRsZS50cyIsInNvdXJjZS90cy9XYXJyaW9yLnRzIiwic291cmNlL3RzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQ0FBLHVCQUFtQixVQUFVLENBQUMsQ0FBQTtBQUc5QjtJQUdJLDBCQUEwQjtJQUMxQjtRQUNJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsdUJBQXVCO0lBQ3ZCLEVBQUU7SUFDRixtRUFBbUU7SUFDbkUsa0RBQWtEO0lBQzFDLHdCQUFVLEdBQWxCO1FBQUEsaUJBRUM7UUFERyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLGNBQU8sS0FBSSxDQUFDLGFBQWEsRUFBRSxDQUFBLENBQUEsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFFRCw0QkFBNEI7SUFDNUIsRUFBRTtJQUNGLHlFQUF5RTtJQUN6RSw4REFBOEQ7SUFDdEQsMkJBQWEsR0FBckI7UUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2xDLDBEQUEwRDtRQUMxRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksZ0JBQU0sRUFBRSxDQUFDO1FBQzNCLFFBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDOUQsMkNBQTJDO1FBQzNDLDZCQUE2QjtJQUNqQyxDQUFDO0lBRUQsaUNBQWlDO0lBQ3pCLDJCQUFhLEdBQXJCLFVBQXNCLEVBQVU7UUFDNUIsSUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoRCxJQUFJLGdCQUFnQixHQUFHLGFBQWEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDakUsSUFBSSxl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LFNBQVMsR0FBRyxPQUFPLENBQUM7UUFDNUIsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2YsT0FBTyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDdEIsT0FBTyxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7UUFDaEMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2pCLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBQ0wsY0FBQztBQUFELENBeENBLEFBd0NDLElBQUE7QUF4Q0Q7eUJBd0NDLENBQUE7OztBQzNDRCxvQkFBZ0IsT0FBTyxDQUFDLENBQUE7QUFDeEIsSUFBSSxHQUFHLEdBQUcsSUFBSSxhQUFHLEVBQUUsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgQmF0dGxlIGZyb20gJy4vQmF0dGxlJztcclxuaW1wb3J0IFRlc3QgZnJvbSAnLi9UZXN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcCAge1xyXG4gICAgcHVibGljIHRlc3Q6IGFueTtcclxuICAgIHB1YmxpYyBiYXR0bGU6IElCYXR0bGU7XHJcbiAgICAvLyBBcHBsaWNhdGlvbiBDb25zdHJ1Y3RvclxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBCaW5kIEV2ZW50IExpc3RlbmVyc1xyXG4gICAgLy9cclxuICAgIC8vIEJpbmQgYW55IGV2ZW50cyB0aGF0IGFyZSByZXF1aXJlZCBvbiBzdGFydHVwLiBDb21tb24gZXZlbnRzIGFyZTpcclxuICAgIC8vICdsb2FkJywgJ2RldmljZXJlYWR5JywgJ29mZmxpbmUnLCBhbmQgJ29ubGluZScuXHJcbiAgICBwcml2YXRlIGJpbmRFdmVudHMoKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZGV2aWNlcmVhZHknLCAoKSA9PiB7dGhpcy5vbkRldmljZVJlYWR5KCl9LCBmYWxzZSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIGRldmljZXJlYWR5IEV2ZW50IEhhbmRsZXJcclxuICAgIC8vXHJcbiAgICAvLyBUaGUgc2NvcGUgb2YgJ3RoaXMnIGlzIHRoZSBldmVudC4gSW4gb3JkZXIgdG8gY2FsbCB0aGUgJ3JlY2VpdmVkRXZlbnQnXHJcbiAgICAvLyBmdW5jdGlvbiwgd2UgbXVzdCBleHBsaWNpdGx5IGNhbGwgJ2FwcC5yZWNlaXZlZEV2ZW50KC4uLik7J1xyXG4gICAgcHJpdmF0ZSBvbkRldmljZVJlYWR5KCkge1xyXG4gICAgICAgIHRoaXMucmVjZWl2ZWRFdmVudCgnZGV2aWNlcmVhZHknKTtcclxuICAgICAgICAvLyBhbGVydCgnVGhpcyBUeXBlU2NyaXB0IGFwcGxpY2F0aW9uIGlzIHJlYWR5IHRvIHJvY2suJykgXHJcbiAgICAgICAgdGhpcy5iYXR0bGUgPSBuZXcgQmF0dGxlKCk7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RldmljZXJlYWR5Jykuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIC8vIHRoaXMudGVzdCA9IG5ldyBUZXN0KCdydW1wbGVzdGlsdHNraW4nKTtcclxuICAgICAgICAvLyB0aGlzLnRlc3Quc2hvd3NvbWV0aGluZygpO1xyXG4gICAgfSAgXHJcblxyXG4gICAgLy8gVXBkYXRlIERPTSBvbiBhIFJlY2VpdmVkIEV2ZW50XHJcbiAgICBwcml2YXRlIHJlY2VpdmVkRXZlbnQoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHZhciBwYXJlbnRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG4gICAgICAgIHZhciBsaXN0ZW5pbmdFbGVtZW50ID0gcGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdGVuaW5nJyk7XHJcbiAgICAgICAgdmFyIHJlY2VpdmVkRWxlbWVudCA9IHBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLnJlY2VpdmVkJyk7XHJcblxyXG4gICAgICAgIGxpc3RlbmluZ0VsZW1lbnQuc2V0QXR0cmlidXRlKCdzdHlsZScsICdkaXNwbGF5Om5vbmU7Jyk7XHJcbiAgICAgICAgcmVjZWl2ZWRFbGVtZW50LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnZGlzcGxheTpibG9jazsnKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coJ1JlY2VpdmVkIEV2ZW50OiAnICsgaWQpO1xyXG4gICAgfSAgICBcclxuXHJcbn1cclxuIiwiaW1wb3J0IFdhcnJpb3IgZnJvbSAnLi9XYXJyaW9yJztcclxuLy8gbGV0IE5VTUJFUl9PRl9XQVJSSU9SUzogbnVtYmVyID0gNTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhdHRsZSBpbXBsZW1lbnRzIElCYXR0bGUge1xyXG4gICAgbnVtYmVyX29mX3dhcnJpb3JzOiBudW1iZXI7XHJcbiAgICBiYXR0bGVmaWVsZF93aWR0aDogbnVtYmVyO1xyXG4gICAgYmF0dGxlZmllbGRfaGVpZ2h0OiBudW1iZXI7XHJcbiAgICB3YXJyaW9yczogQXJyYXk8V2Fycmlvcj47XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5udW1iZXJfb2Zfd2FycmlvcnMgPSAxMDtcclxuICAgICAgICB0aGlzLmJhdHRsZWZpZWxkX2hlaWdodCA9IDUwMDtcclxuICAgICAgICB0aGlzLmJhdHRsZWZpZWxkX3dpZHRoID0gNTAwO1xyXG4gICAgICAgIC8vdGhpcy53YXJyaW9ycyA9IFtdO1xyXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVXYXJyaW9ycyg1LCAnY2xvc2UnKTtcclxuXHJcbiAgICAgICAgbGV0IGNhbnZhcyA9IDxIVE1MQ2FudmFzRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJyk7XHJcblxyXG4gICAgICAgIGNhbnZhcy53aWR0aCA9IDUwMDtcclxuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gNTAwO1xyXG4gICAgICAgIGlmIChjYW52YXMuZ2V0Q29udGV4dCkge1xyXG4gICAgICAgICAgICAvLyBDbGVhciB0aGUgY2FudmFzXHJcbiAgICAgICAgICAgIHZhciBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChldmVudCk9PiB7XHJcbiAgICAgICAgLy8gICAgIHZhciBpbmZvID0gdGhpcy5tZXRhKGV2ZW50KTtcclxuICAgICAgICAvLyAgICAgaWYgKGluZm8pIHtcclxuICAgICAgICAvLyAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuYW5pbWF0ZShpbmZvWzBdLCB0aGlzLndhcnJpb3JbaW5mb1swXV0gKyBpbmZvWzFdLCAxMDAwKTtcclxuICAgICAgICAvLyAgICAgfTtcclxuICAgICAgICAvLyB9KTtcclxuXHJcbiAgICAgICAgLy8gZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgLy8gICAgIHZhciBpbmZvID0gdGhpcy5tZXRhKGUpO1xyXG5cclxuICAgICAgICAvLyAgICAgaWYgKGluZm8pIHtcclxuICAgICAgICAvLyAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuYW5pbWF0ZShpbmZvWzBdLCB0aGlzLndhcnJpb3JbaW5mb1swXV0sIDEwMDApO1xyXG4gICAgICAgIC8vICAgICB9O1xyXG4gICAgICAgIC8vIH0pO1xyXG5cclxuICAgICAgICAvLyBTdGFydCB0aGUgcmVkcmF3aW5nIHByb2Nlc3NcclxuICAgICAgICAvL3RoaXMucmVuZGVyKCk7XHJcblxyXG5cclxuICAgICAgICBpZiAodGhpcy53YXJyaW9ycyAmJiB0aGlzLndhcnJpb3JzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLndhcnJpb3JzLmZvckVhY2god2FycmlvciA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBEcmF3IHRoZSB3YXJyaW9yXHJcbiAgICAgICAgICAgICAgICB3YXJyaW9yLmRyYXdXYXJyaW9yKGNvbnRleHQsIHdhcnJpb3IpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gUmVkcmF3XHJcbiAgICAgICAgICAgIC8vIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnJlbmRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgZ2VuZXJhdGVXYXJyaW9ycyh1bml0TnVtYmVyQ29sdW1uczogbnVtYmVyLCBvcmRlcjogT3JkZXIpIHtcclxuICAgICAgICBsZXQgb3BlcmF0aW5nU3BhY2U6IG51bWJlciA9IG9yZGVyID09PSAnY2xvc2UnID8gMTIgOiAxODtcclxuICAgICAgICB0aGlzLndhcnJpb3JzID0gW107XHJcbiAgICAgICAgbGV0IHJvdzogbnVtYmVyID0gMTtcclxuICAgICAgICBsZXQgY29sdW1uIDogbnVtYmVyID0gMTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IHRoaXMubnVtYmVyX29mX3dhcnJpb3JzICsgMTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChjb2x1bW4gPiB1bml0TnVtYmVyQ29sdW1ucykge1xyXG4gICAgICAgICAgICAgICAgY29sdW1uID0gMTtcclxuICAgICAgICAgICAgICAgIHJvdyArKztcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgbGV0IHdhcnJpb3IgPSBuZXcgV2FycmlvcihvcGVyYXRpbmdTcGFjZSAqIGNvbHVtbiwgb3BlcmF0aW5nU3BhY2UgKiByb3csICdncmVlbicpO1xyXG4gICAgICAgICAgICB0aGlzLndhcnJpb3JzLnB1c2god2Fycmlvcik7XHJcbiAgICAgICAgICAgIGNvbHVtbiArKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgpIHtcclxuICAgICAgICAvLyB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgICAgLy8gICAgICg8YW55PndpbmRvdykud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgICAgLy8gICAgICg8YW55PndpbmRvdykubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgICAgLy8gICAgIHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxyXG4gICAgICAgIC8vICAgICAoPGFueT53aW5kb3cpLm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcclxuICAgICAgICAvLyAgICAgZnVuY3Rpb24gKGNhbGxiYWNrOiBhbnkpIHtcclxuICAgICAgICAvLyAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGNhbGxiYWNrLCAxKTtcclxuICAgICAgICAvLyAgICAgfTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIC8vIGxldCBjYW52YXMgPSA8SFRNTENhbnZhc0VsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpO1xyXG4gICAgICAgIC8vIGNhbnZhcy53aWR0aCA9IDUwMDA7XHJcbiAgICAgICAgLy8gY2FudmFzLmhlaWdodCA9IDUwMDA7XHJcbiAgICAgICAgLy8gaWYgKGNhbnZhcy5nZXRDb250ZXh0KSB7XHJcbiAgICAgICAgLy8gICAgIC8vIENsZWFyIHRoZSBjYW52YXNcclxuICAgICAgICAvLyAgICAgdmFyIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICAvLyAgICAgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICAvLyAgICAgaWYgKHRoaXMud2FycmlvcnMgJiYgdGhpcy53YXJyaW9ycy5sZW5ndGgpIHtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMud2FycmlvcnMuZm9yRWFjaCh3YXJyaW9yID0+IHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAvLyBEcmF3IHRoZSB3YXJyaW9yXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBjb250ZXh0LmFyYyh3YXJyaW9yLngsIHdhcnJpb3IueSwgd2Fycmlvci5waHlzaWNhbFJhZGl1cywgMCwgMiAqIE1hdGguUEksIGZhbHNlKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IHdhcnJpb3IuZmlsbENvbG91cjtcclxuICAgICAgICAvLyAgICAgICAgICAgICBjb250ZXh0LmZpbGwoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBjb250ZXh0LmxpbmVXaWR0aCA9IDU7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9ICcjMDAzMzAwJztcclxuICAgICAgICAvLyAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XHJcbiAgICAgICAgLy8gICAgICAgICB9KTtcclxuICAgICAgICAvLyAgICAgICAgIC8vIFJlZHJhd1xyXG4gICAgICAgIC8vICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMucmVuZGVyKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlKHByb3BlcnR5OiBzdHJpbmcsIHZhbHVlOiBudW1iZXIsIGR1cmF0aW9uOiBudW1iZXIpIHtcclxuICAgICAgICAvLyBsZXQgd2FycmlvciA9IDxhbnk+dGhpcy53YXJyaW9yc1swXTtcclxuICAgICAgICAvLyAvLyBUaGUgY2FsY3VsYXRpb25zIHJlcXVpcmVkIGZvciB0aGUgc3RlcCBmdW5jdGlvblxyXG4gICAgICAgIC8vIHZhciBzdGFydCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIC8vIHZhciBlbmQgPSBzdGFydCArIGR1cmF0aW9uO1xyXG4gICAgICAgIC8vIHZhciBjdXJyZW50VmFsdWUgPSB3YXJyaW9yW3Byb3BlcnR5XTtcclxuICAgICAgICAvLyB2YXIgZGlzdGFuY2UgPSB2YWx1ZSAtIGN1cnJlbnRWYWx1ZTtcclxuXHJcbiAgICAgICAgLy8gdmFyIHN0ZXAgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gICAgIC8vIEdldCBvdXIgY3VycmVudCBwcm9ncmVzXHJcbiAgICAgICAgLy8gICAgIHZhciB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAvLyAgICAgdmFyIHByb2dyZXNzID0gTWF0aC5taW4oKGR1cmF0aW9uIC0gKGVuZCAtIHRpbWVzdGFtcCkpIC8gZHVyYXRpb24sIDEpO1xyXG5cclxuICAgICAgICAvLyAgICAgLy8gVXBkYXRlIHRoZSB3YXJyaW9ycydzIHByb3BlcnR5XHJcbiAgICAgICAgLy8gICAgIHdhcnJpb3JbcHJvcGVydHldID0gY3VycmVudFZhbHVlICsgKGRpc3RhbmNlICogcHJvZ3Jlc3MpO1xyXG5cclxuICAgICAgICAvLyAgICAgLy8gSWYgdGhlIGFuaW1hdGlvbiBoYXNuJ3QgZmluaXNoZWQsIHJlcGVhdCB0aGUgc3RlcC5cclxuICAgICAgICAvLyAgICAgaWYgKHByb2dyZXNzIDwgMSkgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHN0ZXApO1xyXG4gICAgICAgIC8vIH07XHJcblxyXG4gICAgICAgIC8vIC8vIFN0YXJ0IHRoZSBhbmltYXRpb25cclxuICAgICAgICAvLyByZXR1cm4gc3RlcCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL2FuaW1hdGUoJ3gnLCAwLCAxMDAwKTtcclxuXHJcbiAgICBtZXRhKGV2ZW50OiBhbnkpOiBBcnJheTxhbnk+IHtcclxuXHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG5cclxuXHJcbiAgICB9XHJcbn1cclxuIiwibGV0IFBIWVNJQ0FMX1JBRElVUzogbnVtYmVyID0gMjsgLy8gMiBjdWJpdHMgb3IgOTBjbVxyXG5sZXQgT1BFUkFUSU5HX1JBRElVUzogbnVtYmVyID0gNjsgLy8yIGN1Yml0cyBlaXRoZXIgc2lkZSBpbiBub3JtYWwgcGhhbGFueCBtYXJjaGluZyBvcmRlclxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2FycmlvciBpbXBsZW1lbnRzIElXYXJyaW9yIHtcclxuICAgIHB1YmxpYyBpZDogbnVtYmVyO1xyXG4gICAgcHVibGljIHg6IG51bWJlcjtcclxuICAgIHB1YmxpYyB5OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcGh5c2ljYWxSYWRpdXM6IG51bWJlcjtcclxuICAgIHB1YmxpYyBvcGVyYXRpbmdSYWRpdXM6IG51bWJlcjtcclxuICAgIHB1YmxpYyBmaWxsQ29sb3VyOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgZmlsbENvbG91cj86IHN0cmluZyApe1xyXG4gICAgICAgIGlmICgheCB8fCAheSl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG5cclxuICAgICAgICB0aGlzLmZpbGxDb2xvdXIgPSBmaWxsQ29sb3VyIHx8ICcjMDAwMDAwJztcclxuICAgICAgICB0aGlzLm9wZXJhdGluZ1JhZGl1cyA9IE9QRVJBVElOR19SQURJVVM7XHJcbiAgICAgICAgdGhpcy5waHlzaWNhbFJhZGl1cyA9IFBIWVNJQ0FMX1JBRElVUztcclxuXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0V2FycmlvckJvZHlBc0NpcmNsZSgpOiBJV2FycmlvckJvZHlBc0NpcmNsZSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgeDogdGhpcy54LFxyXG4gICAgICAgICAgICB5OiB0aGlzLnksXHJcbiAgICAgICAgICAgIHJhZGl1czogdGhpcy5waHlzaWNhbFJhZGl1cyxcclxuICAgICAgICAgICAgc3RhcnRBbmdsZTogMCxcclxuICAgICAgICAgICAgZW5kQW5nbGU6IDIgKiBNYXRoLlBJLFxyXG4gICAgICAgICAgICBjb3VudGVyQ2xvY2t3aXNlOiBmYWxzZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZHJhd1dhcnJpb3IoY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCB3YXJyaW9yOiBJV2Fycmlvcikge1xyXG4gICAgICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmFyYyh3YXJyaW9yLngsIHdhcnJpb3IueSwgd2Fycmlvci5waHlzaWNhbFJhZGl1cywgMCwgMiAqIE1hdGguUEksIGZhbHNlKTtcclxuICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSAnZ3JlZW4nO1xyXG4gICAgICAgICAgICBjb250ZXh0LmZpbGwoKTtcclxuICAgICAgICAgICAgY29udGV4dC5saW5lV2lkdGggPSA1O1xyXG4gICAgICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gJyMwMDMzMDAnO1xyXG4gICAgICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBBcHAgZnJvbSAnLi9BcHAnO1xubGV0IGFwcCA9IG5ldyBBcHAoKTtcbiJdfQ==
