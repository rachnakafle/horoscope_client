import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'itemFilter' })
export class FilterPipe implements PipeTransform {
  /**
   * Pipe filters the list of elements based on the search text provided
   *
   * @param items list of elements to search in
   * @param searchText search string
   * @returns list of elements filtered by search text or []
   */
  transform(x: any[], searchText: string, items: any[],): any[] {
    
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();
    
    let y = items.filter(it => {
        //return it.toLocaleLowerCase().includes(searchText);
        if(it.fullName.toLowerCase().includes(searchText)){
            return it;
        }
      });  
    
    return y;
  }
}


