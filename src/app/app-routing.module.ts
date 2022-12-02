import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { GiphySearchComponent } from './pages/giphy/giphy-search/giphy-search.component'
import { GiphyTrendingComponent } from './pages/giphy/giphy-trending/giphy-trending.component'

const routes: Routes = [
  { path: 'trending', component: GiphyTrendingComponent },
  { path: 'search', component: GiphySearchComponent },
  { path: '',   redirectTo: '/trending', pathMatch: 'full' },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
