import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PokemonEntry } from '../interfaces/pokemon-entry';
import { PokemonStats } from '../interfaces/pokemon-stats';
import { PokemonType } from '../interfaces/pokemon-type';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private http: HttpClient) {}

  getPokemons(): Observable<Pokemon[]> {
    return this.http.get(`${environment.baseUrl}/pokedex/1/`).pipe(
      map((res: any) => {
        let pokemons: Pokemon[] = [];
        let reducedPokemonEntries = res.pokemon_entries.splice(0, 50);

        reducedPokemonEntries.forEach((entry: PokemonEntry) => {
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

  getDetails(id: number): Observable<Pokemon> {
    return this.http.get(`${environment.baseUrl}/pokemon/${id}/`).pipe(
      map((res: any) => {
        let pokemon = new Pokemon(res.name, res.id, [], [], [], '');

        res.types.forEach((type: PokemonType) => {
          pokemon.types.push(type.type.name);
        });

        res.stats.forEach((stat: PokemonStats) => {
          pokemon.stats.push({
            name: stat.stat.name,
            value: stat.base_stat,
          });
        });

        for (let sprite in res.sprites) {
          if (res.sprites[sprite] && typeof res.sprites[sprite] === 'string') {
            pokemon.sprites.push({
              name: sprite,
              imagePath: res.sprites[sprite],
            });
          }
        }

        return pokemon;
      })
    );
  }
}
