import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PokemonEntryDTO } from '../models/pokemon-entry-dto.model';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private http: HttpClient) {}

  getPokemons(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/pokedex/1/`).pipe(
      map((res: any) => {
        let pokemons: Pokemon[] = [];
        let reducedPokemonEntries = JSON.parse(
          res._body
        ).pokemon_entries.splice(0, 50);

        reducedPokemonEntries.forEach((entry: PokemonEntryDTO) => {
          let pokemon = new Pokemon(
            entry.pokemon_species.name,
            entry.entry_number,
            [],
            [],
            [],
            ''
          );

          pokemons.push(pokemon);
        });
        return pokemons;
      })
    );
  }
}
