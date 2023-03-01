export class Pokemon {
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
  name: string;
  id: number;
  types: any[];
  stats: any[];
  sprites: Sprite[];
  imageurl: string;

  get imageUrl() {
    return `https://rawgit.com/PokeAPI/sprites/master/sprites/pokemon/${this.id}.png`;
  }
}

export class Sprite {
  name: string;
  imagePath: string;

  constructor(name: string, imagePath: string) {
    this.name = name;
    this.imagePath = imagePath;
  }
}
