import {Pipe} from '@angular/core';

@Pipe({
    name: 'toFixed'
})

export class ToFixedPipe {
    transform(val: number, amount: string) {
        const nr = parseInt(amount, 10);
        return val.toFixed(nr);
    }
}
