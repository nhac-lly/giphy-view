import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component'
import { GiphyDetailsComponent } from './components/giphy/giphy-details/giphy-details.component'
import { GiphyListComponent } from './components/giphy/giphy-list/giphy-list.component'
import { GiphySearchComponent } from './pages/giphy/giphy-search/giphy-search.component'
import { GiphyTrendingComponent } from './pages/giphy/giphy-trending/giphy-trending.component'

@NgModule({
    declarations: [
        AppComponent,
        GiphyListComponent,
        GiphyDetailsComponent,
        GiphyTrendingComponent,
        GiphySearchComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
