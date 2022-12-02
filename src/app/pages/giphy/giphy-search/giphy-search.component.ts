import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { environments } from 'src/environments/environments';
import { ApiService } from 'src/utils/apiService';
import { createService } from 'src/utils/createService';

@Component({
  selector: 'app-giphy-search',
  templateUrl: './giphy-search.component.html',
})
export class GiphySearchComponent {
  searchService?: Subscription;
  searchRes: any;
  inputValue: string = '';
  infData: any[] = [];
  curLength: number = 0;
  pagination: any;
  meta: any;

  constructor(public api: ApiService) {}

  getNext(count: number, inputValue: string): void {
    if (this.pagination && this.curLength === this.pagination.total_count)
      return;
    this.searchService = this.api
      ?.get('http://api.giphy.com/v1/gifs/search', {
        apikey: btoa(environments.key),
        q: this.inputValue,
        limit: 10,
        offset: count,
      })
      .subscribe({
        next: res => {
          this.infData = this.infData.concat(res.data);
          this.pagination = res.pagination;
          this.meta = res.meta;
          this.curLength = res.pagination.count + this.curLength;
        },
      });
  }

  onKey(event: any) {
    console.log(event.target.value);
    this.inputValue = event.target.value || '';
    this.infData = [];
    this.inputValue.length > 2 && this.getNext(this.curLength, this.inputValue);
  }
}
