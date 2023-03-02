import { isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PokemonEntry } from '../interfaces/pokemon-entry';
import { PokemonStats } from '../interfaces/pokemon-stats';
import { PokemonType } from '../interfaces/pokemon-type';
import { Pokemon } from '../models/pokemon.model';

const POKEMONS_KEY = makeStateKey<Pokemon[]>('pokemons');
const POKEMON_DETAILS_KEY = makeStateKey<Pokemon>('pokemon_details');

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(
    private http: HttpClient,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  getPokemons(): Observable<Pokemon[]> {
    if (this.transferState.hasKey(POKEMONS_KEY)) {
      const pokemons = this.transferState.get(POKEMONS_KEY, null as any);
      this.transferState.remove(POKEMONS_KEY);
      return of(pokemons);
    } else {
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
              `https://rawgit.com/PokeAPI/sprites/master/sprites/pokemon/${entry.entry_number}.png`
            );

            pokemons.push(pokemon);
          });
          if (isPlatformServer(this.platformId)) {
            this.transferState.set(POKEMONS_KEY, pokemons);
          }
          return pokemons;
        })
      );
    }
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
