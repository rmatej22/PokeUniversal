import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private title: Title, private meta: Meta) {}

  ngOnInit(): void {
    this.title.setTitle('Explore Pokemons');

    this.meta.addTags([
      {
        name: 'author',
        content: 'Matej',
      },
      {
        name: 'keywords',
        content: 'angular-universal-seo',
      },
      {
        name: 'description',
        content: 'Simple Angular application with SSR.',
      },
    ]);
  }
}
