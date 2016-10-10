import {Pipe} from '@angular/core';

@Pipe({
  name: 'reverseSlice'
})

export class ReverseSlicePipe {
  transform(val: string, amount: string) {
    const nr = parseInt(amount, 10);
    const ret = `${val}`.slice(0, val.length - nr);
    return ret;
  }
}
