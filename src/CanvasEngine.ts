import { clickCanvas } from "./clickCanvas";
import { EngineState } from "./EngineState";

/**
 * Engine to control and interact with a canvas
 */
export class CanvasEngine {
    //private state: EngineState;
    private canvas: HTMLCanvasElement;
    //private context: CanvasRenderingContext2D;

    constructor(canvasHolderId: string, options: {

        /**
         * Canvas Width (max x)
         */
        width: number,

        /**
         * Canvas Height (max y)
         */
        height: number, 



        // callbacks for the canvas

        /**
         * called when the canvas is clicked
         */
        clickCallback?: (x: number, y: number) => void,

        /**
         * called to draw
         */
        drawCallback?: (context: CanvasRenderingContext2D, width: number, height: number) => void,

    }) {

        const {height, width, clickCallback, drawCallback} = options;

        this.canvas = CanvasEngine.createCanvas(canvasHolderId);
        this.canvas.width = width;
        this.canvas.height = height;
        

        // state isn't needed
        //this.state = new EngineState();
 
        if (clickCallback) {
            // Set up canvas click handler
            this.canvas.onclick = (e: MouseEvent) => {
                clickCanvas(e, this.canvas, (x: number, y: number) => {
                    clickCallback(x,y);
                    //this.click(x,y);
                });
            };
        }
        
        //this.state.draw(this.context);

        const context = CanvasEngine.canvasContext(this.canvas);
        const canvasRefreshIntervalMilliseconds = 50; // 20 FPS
        if (drawCallback) {
            // Canvas refresh interval
            setInterval(() => {
                //console.log("interval")
                drawCallback(context, width, height);

                //this.state.draw(this.context);
            }, canvasRefreshIntervalMilliseconds);
        }
        
    }

    // /**
    //  * receives the point clicked on the canvas in x, y coordinates
    //  * @param x 
    //  * @param y 
    //  */
    // private click(x: number, y: number) {
    //     console.log(`${x} ${y}`);
    //     this.state.addCircle({center: {x,y}, radius: 10});
    // }

    private static canvasContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
        const context = canvas.getContext("2d");
        if (context) {
            return context;
        } else {
            throw "invalid context";
        }
    }

    private static createCanvas(id: string) {
        const insert = document.getElementById(id);
        if (insert) {
            const canvas = document.createElement("canvas");
            insert.appendChild(canvas);
            return canvas;
        }
        throw `invalid element ${id}`
    }
    
}