import { Sprite } from './sprite.model';

export class Pokemon {
  name: string;
  id: number;
  types: any[];
  stats: any[];
  sprites: Sprite[];
  imageurl: string;

  constructor(
    name: string,
    id: number,
    types: any[],
    stats: any[],
    sprites: Sprite[],
    imageurl: string
  ) {
    this.name = name;
    this.id = id;
    this.types = types;
    this.stats = stats;
    this.sprites = sprites;
    this.imageurl = imageurl;
  }

  get imageUrl() {
    return `https://rawgit.com/PokeAPI/sprites/master/sprites/pokemon/${this.id}.png`;
  }
}
