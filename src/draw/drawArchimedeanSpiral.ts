export function drawArchimedeanSpiral(context: CanvasRenderingContext2D, options: {
    centerX: number,
    centerY: number,
    line: {
        color: string,
        width: number,
    }
    loops: number,
}) {
    
    const {centerX, centerY} = options;
    console.log(`${centerX} ${centerY}`)
    
    context.save()
    context.moveTo(centerX, centerY)
    context.beginPath()
    
    context.strokeStyle = options.line.color;
    context.lineWidth = options.line.width;

    // how many rotations?
    // how much width?
    const thetaMax = (2 * Math.PI) * options.loops
    const thetaDelta = (2 * Math.PI) / (4 * 32)
    const a = 0;
    const b = 10;
    let theta = 0;
    do {
        const r = a + b * theta;

        // + and - control the direction and orientation of the spiral
        const x = centerX + r * Math.cos(theta);
        const y = centerY - r * Math.sin(theta);
        console.log(`${x} ${y}`)

        context.lineTo(x, y);

        theta += thetaDelta;
    }while(theta < thetaMax)


    //context.closePath();
    context.stroke();
    context.restore();

}