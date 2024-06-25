export function hexToRgba(hex, alpha = 1) {
    let r, g, b, a;

    // Remove # if present
    hex = hex.replace('#', '');

    // Handle different hex lengths
    if (hex.length === 3) {
        r = parseInt(hex[0] + hex[0], 16);
        g = parseInt(hex[1] + hex[1], 16);
        b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 4) {
        r = parseInt(hex[0] + hex[0], 16);
        g = parseInt(hex[1] + hex[1], 16);
        b = parseInt(hex[2] + hex[2], 16);
        a = parseInt(hex[3] + hex[3], 16) / 255;
    } else if (hex.length === 6) {
        r = parseInt(hex.slice(0, 2), 16);
        g = parseInt(hex.slice(2, 4), 16);
        b = parseInt(hex.slice(4, 6), 16);
    } else if (hex.length === 8) {
        r = parseInt(hex.slice(0, 2), 16);
        g = parseInt(hex.slice(2, 4), 16);
        b = parseInt(hex.slice(4, 6), 16);
        a = parseInt(hex.slice(6, 8), 16) / 255;
    } else {
        // Invalid hex
        throw new Error('Invalid hex color');
    }

    // Convert alpha to range 0-1 if provided
    if (alpha !== undefined) {
        a = alpha;
    }

    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export function rgbaToHex(rgba) {
    const rgbaArray = rgba.substring(5, rgba.length - 1).split(',');
    const r = (+rgbaArray[0]).toString(16).padStart(2, '0');
    const g = (+rgbaArray[1]).toString(16).padStart(2, '0');
    const b = (+rgbaArray[2]).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
}