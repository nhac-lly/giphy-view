import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { environments } from 'src/environments/environments';
import { ApiService } from 'src/utils/apiService';

@Component({
  selector: 'app-giphy-trending',
  templateUrl: './giphy-trending.component.html',
})
export class GiphyTrendingComponent implements OnInit {
  trendingService?: Subscription;
  trendingRes: any;
  infData: any[] = [];
  curLength: number = 0;
  pagination: any;
  meta: any;

  constructor(public api: ApiService) {}

  getNext(count: number): void {
    this.trendingService = this.api
      ?.get('http://api.giphy.com/v1/gifs/trending', {
        apikey: btoa(environments.key),
        limit: 10,
        offset: count,
      })
      .subscribe({
        next: res => {
          console.log(res)
          this.infData = this.infData.concat(res.data)
          this.pagination = res.pagination
          this.meta = res.meta
          this.curLength = res.pagination.count + this.curLength;
        },
      });
  }

  ngOnInit() {
    this.getNext(this.curLength);
  }
}
