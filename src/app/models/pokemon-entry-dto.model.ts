export class PokemonEntryDTO {
  entry_number: number;
  pokemon_species: PokemonSpecies;

  constructor(entry_number: number, pokemon_species: PokemonSpecies) {
    this.entry_number = entry_number;
    this.pokemon_species = pokemon_species;
  }
}

export class PokemonSpecies {
  name: string;
  url: string;
  
  constructor(name: string, url: string) {
    this.name = name;
    this.url = url;
  }
}
