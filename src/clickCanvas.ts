/**
 * to be called when the canvas is clicked where it was clicked
 * call the callback with the canvas coordinates if the click is in the canvas
 * process mouse event for a canvas element and call callback with translated canvas coordinates
 */
export function clickCanvas(
    e: MouseEvent,
    canvas: HTMLCanvasElement,
    callback: (x: number, y: number) => void
) {
    const x = e.pageX;
    const y = e.pageY;

    // Translate to canvas coordinates
    const rect = canvas.getBoundingClientRect();
    const offsetX = rect.x;
    const offsetY = rect.y;

    const canvasX = x - offsetX;
    const canvasY = y - offsetY;

    // check if inside canvas
    if (
        canvasX > 0 &&
        canvasY > 0 &&
        canvasX < canvas.width &&
        canvasY < canvas.height
    ) {
        callback(canvasX, canvasY);
    } else {
        console.log("click not in canvas");
    }
}
