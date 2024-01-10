import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { loadRemoteModule } from '@angular-architects/module-federation';


const wordCardDecks = [
  {
    wordCardDeckName: 'Word Card Deck 1',
    wordCardList: [
      { name: 'Word Card 1.1' },
      { name: 'Word Card 1.2' },
    ],
  },
  {
    wordCardDeckName: 'Word Card Deck 2',
    wordCardList: [
      { name: 'Word Card 2.1' },
      { name: 'Word Card 2.2' },
    ],
  },
];

const flashCardDecks = [
  {
    flashCardDeckName: 'Flash Card Deck 1',
    flashCardList: [
      { name: 'Flash Card 1.1' },
      { name: 'Flash Card 1.2' },
    ],
  },
  {
    flashCardDeckName: 'Flash Card Deck 2',
    flashCardList: [
      { name: 'Flash Card 2.1' },
      { name: 'Flash Card 2.2' },
    ],
  },
];

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {
    path: 'word-card-deck',
    data: { wordCardDecks: wordCardDecks },
    loadChildren: () =>
        loadRemoteModule({
            type: 'module',
            remoteEntry: 'http://localhost:4201/remoteEntry.js',
            exposedModule: './OverallWordCardModule'
        })
        .then(m => m.OverallWordCardModule)
  },
  {
    path: 'flash-card-deck',
    data: { flashCardDecks: flashCardDecks },
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './OverallFlashCardModule'
      })
      .then(m => m.OverallFlashCardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
