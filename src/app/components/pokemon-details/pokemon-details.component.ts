import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css'],
})
export class PokemonDetailsComponent implements OnInit {
  id!: number;
  pokemon$!: Observable<Pokemon>;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.pokemon$ = this.pokemonService.getDetails(this.id).pipe(
        tap((pokemon) => {
          this.title.setTitle(`Pokemon details - ${pokemon.name}`);
          this.meta.updateTag({
            name: 'description',
            content: `Explore interesting facts about your favorite pokemon - ${pokemon.name}`,
          });
        })
      );
    });
  }
}
