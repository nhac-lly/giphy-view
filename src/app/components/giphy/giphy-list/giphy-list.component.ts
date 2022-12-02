import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ApiService } from 'src/utils/apiService';

@Component({
  selector: 'app-giphy-list',
  templateUrl: './giphy-list.component.html',
})
export class GiphyListComponent implements OnInit, AfterViewInit {
  @ViewChildren('giphyNext', { read: ElementRef })
  giphyNext?: QueryList<ElementRef>;

  @Input() infData!: any;
  @Input() pagination!: any;
  @Input() meta!: any;
  @Input() getNext!: any;
  @Input() curLength!: number;
  @Input() inputValue!: string; // not sure why but got undefined, needed to add this

  constructor(public api: ApiService) {}

  curGif: any = {};
  selectGif(gif: any) {
    return (this.curGif = gif);
  }
  observerOptions = {
    rootMargin: '0px',
    threshold: 0.5,
  };
  observer?: IntersectionObserver;

  ngOnInit() {
    this.observer = new IntersectionObserver(
      (entries, observer) =>
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.getNext(this.curLength, this.inputValue);
          }
        }),
      this.observerOptions
    );
  }

  ngAfterViewInit() {
    // temp timeout to check after image loading
    this.giphyNext?.last?.nativeElement &&
      setTimeout(
        () => this.observer!.observe(this.giphyNext?.last?.nativeElement),
        2000
      );
    this.giphyNext?.changes.subscribe(el => {
      if (el?.last?.nativeElement)
        setTimeout(() => this.observer!.observe(el?.last?.nativeElement), 500);
    });
  }
}
