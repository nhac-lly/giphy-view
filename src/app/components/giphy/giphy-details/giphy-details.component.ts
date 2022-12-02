import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-giphy-details',
    templateUrl: './giphy-details.component.html',
})
export class GiphyDetailsComponent {
  @Input() gif!: any
}
