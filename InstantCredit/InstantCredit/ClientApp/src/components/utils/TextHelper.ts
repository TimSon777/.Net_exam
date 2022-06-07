﻿export function camelPad(str: string) {
    return str
        .replace(/([A-Z]+)([A-Z][a-z])/g, ' $1 $2')
        .replace(/([a-z\d])([A-Z])/g, '$1 $2')
        .replace(/([a-zA-Z])(\d)/g, '$1 $2')
        .replace(/^./, function(str) { 
            return str.toUpperCase(); 
        })
        .trim();
}