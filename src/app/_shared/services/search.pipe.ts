import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if (args == '') return;

    args = args.toLowerCase();

    return value.filter(function (item: any) {
      return JSON.stringify(item.nama).toLowerCase().includes(args);
    });
  }

}
