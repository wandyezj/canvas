import { drawArchimedeanSpiral } from "./draw/drawArchimedeanSpiral";
import { Line } from "./Line";
import { Square } from "./Square";

function drawLine(context: CanvasRenderingContext2D, line:Line) {
    const {from, to} = line;
    context.beginPath();
    context.strokeStyle = "green";
    context.moveTo(from.x, from.y);
    context.lineTo(to.x, to.y);
    context.closePath();
    context.stroke();
}

function randomIndex(length: number) {
    return Math.floor(Math.random() * length);
}

/**
 * [minimum, maximum)
 * @param minimum 
 * @param maximum 
 */
function random(minimum: number, maximum: number) {
    const range = maximum - minimum;
    return minimum + randomIndex(range);
}

function last<T>(array: T[]): T {
    return array[array.length - 1];
}

class GrowingTree {

    private branches: Line[][] = [];

    constructor(private origin: Point, private depth: number) {

    }

    public grow() {
        let start = this.origin;
        
        if (this.branches.length > 0) {
            // more like a snake sine its only selecting the last node
            const leaves = last(this.branches);
            const leafIndex = randomIndex(leaves.length);
            const leaf = leaves[leafIndex]
            start = leaf.to;
        }

        // need to grow a bit
        // really need to be a bit more controlling
        // so branches do not intercept each other
        const minGrowth =10;
        const maxGrowth =20;
        let offset = random(minGrowth, maxGrowth);

        let end = {x: start.x + offset, y: start.y + offset};

        const line: Line = {
            from: start,
            to: end
        };

        this.branches.push([line]);

    }

    public draw(context: CanvasRenderingContext2D) {
        this.branches.forEach((branch) => {
            //drawLine(context,  branch)
        });
        
    }
}


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
        //context.strokeStyle = "pink";
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
        // Background
        context.clearRect(0, 0, width, height);
        context.fillStyle = "black";
        context.fillRect(0, 0, width, height);

        this.circles.forEach((circle) => {
            EngineState.drawCircle(context, circle);
        });

        this.squares.forEach((square) => {
            context.strokeStyle = "red";
            EngineState.drawSquare(context, square);
        });

        drawArchimedeanSpiral(context, {
        centerX: width / 2, 
        centerY: height / 2,
        line: {
            color: "blue",
            width: 5,
        },
        loops: 3
    })
    }
}
