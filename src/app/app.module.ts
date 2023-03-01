import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';

@NgModule({
  declarations: [AppComponent, PokemonListComponent, PokemonDetailsComponent],
  imports: [BrowserModule.withServerTransition({ appId: 'serverApp' })],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
