import { EngineState } from "./EngineState";

/**
 * Engine handles the state
 */
export class Engine {
    private state: EngineState = new EngineState();
    constructor() {}

    click(x: number, y: number) {
        const center = { x, y };
        const radius = 10;
        this.state.addCircle({ center, radius });
        this.state.addSquare({ center, size: radius * 2 });
    }

    draw(context: CanvasRenderingContext2D, width: number, height: number) {
        this.state.draw(context, width, height);
    }
}
