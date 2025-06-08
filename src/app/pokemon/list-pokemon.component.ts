import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon/pokemon';
import { Router } from '@angular/router';
import { PokemonService } from '../pokemon/pokemon.service';

@Component({
  standalone: false,
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.scss'],

})
export class ListPokemonComponent implements OnInit {
  pokemonList: Pokemon[];

  constructor(
    private router: Router,
    private pokemonService: PokemonService
  ) { }

  ngOnInit() {
    this.pokemonService.getPokemonList().
      subscribe(pokemonList => this.pokemonList = pokemonList);
  }



  goToPokemon(pokemon: Pokemon): void {
    this.router.navigate(['/pokemons', pokemon.id]);
  }
}
