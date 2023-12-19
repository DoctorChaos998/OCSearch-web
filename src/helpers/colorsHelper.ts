const hexSymbol = "0123456789ABCDEF";
export function generateRandomColor(): string{
    return `${hexSymbol[Math.floor(Math.random() * hexSymbol.length)]}${hexSymbol[Math.floor(Math.random() * hexSymbol.length)]}${hexSymbol[Math.floor(Math.random() * hexSymbol.length)]}${hexSymbol[Math.floor(Math.random() * hexSymbol.length)]}${hexSymbol[Math.floor(Math.random() * hexSymbol.length)]}${hexSymbol[Math.floor(Math.random() * hexSymbol.length)]}`
}
export function checkColorValidation(color: string): boolean{
    return CSS.supports('color', `#${color}`);
}

export function checkColorLightness(color: string){
    let maxLightness = 0;
    if(color.length === 3){
        for(let i = 0;i<3;i++){
            const currentLightness = parseInt(`${color[i]}${color[i]}`,16)
            if(currentLightness > maxLightness){
                maxLightness = currentLightness;
            }
        }
    }
    else {
        for(let i = 0;i<6;i+=2) {
            const currentLightness = parseInt(`${color[i]}${color[i+1]}`,16);
            if(currentLightness > maxLightness){
                maxLightness = currentLightness;
            }
        }
    }
    return maxLightness / 255 > 0.5;
}