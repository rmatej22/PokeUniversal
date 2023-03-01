export interface PokemonEntry {
  entry_number: number;
  pokemon_species: PokemonSpecies;
}

export interface PokemonSpecies {
  name: string;
  url: string;
}
