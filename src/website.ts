import { Draw } from "./Draw";
import { CanvasEngine } from "./CanvasEngine";
import { EngineState } from "./EngineState";
import { Engine } from "./Engine";

export function website(): string {
    return "website";
}

export function clock() {
    setInterval(() => {
        const element = document.getElementById("insert");
        if (element) {
            element.innerText = Date.now().toString();
        }
    }, 1000);
}

export function initializeCanvas() {
    const engine = new Engine();

    const height = 600;
    const width = 600;

    const canvas = new CanvasEngine("canvas", {
        height,
        width,
        clickCallback: (x, y) => {
            engine.click(x, y);
        },
        drawCallback: (context, width, height) => {
            engine.draw(context, width, height);
        },
    });
}
