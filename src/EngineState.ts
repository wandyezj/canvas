import { Square } from "./Square";

export class EngineState {
    private change: boolean = true;
    private circles: Circle[] = [];
    private squares: Square[] = [];
    constructor() {}

    addCircle(circle: Circle) {
        this.circles.push(circle);
        this.update();
    }

    static drawCircle(context: CanvasRenderingContext2D, circle: Circle) {
        const { center, radius } = circle;
        const { x, y } = center;

        context.beginPath();
        context.strokeStyle = "pink";
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.closePath();
        context.stroke();
    }

    addSquare(square: Square) {
        this.squares.push(square);
        this.update();
    }

    static drawSquare(context: CanvasRenderingContext2D, square: Square) {
        const { center, size } = square;
        const offset = size / 2;
        const x = center.x - offset;
        const y = center.y - offset;

        context.beginPath();
        context.strokeStyle = "pink";
        context.rect(x, y, size, size);
        context.closePath();
        context.stroke();
    }

    // only update if there is a change

    update() {
        this.change = true;
    }

    draw(context: CanvasRenderingContext2D, width: number, height: number) {
        if (this.change) {
            this.refresh(context, width, height);

            // all changes were drawn
            this.change = false;
        }
    }

    private refresh(
        context: CanvasRenderingContext2D,
        width: number,
        height: number
    ) {
        context.clearRect(0, 0, width, height);
        context.fillStyle = "blue";
        context.fillRect(0, 0, width, height);

        this.circles.forEach((circle) => {
            EngineState.drawCircle(context, circle);
        });

        this.squares.forEach((square) => {
            EngineState.drawSquare(context, square);
        });
    }
}
