import {Pipe} from "@angular/core";

@Pipe({
    name: 'capitalize'
})

export class CapitalizePipe {
    transform(value: string) {
        const val = value || '';
        return val.charAt(0).toUpperCase() + val.slice(1);
    }
}