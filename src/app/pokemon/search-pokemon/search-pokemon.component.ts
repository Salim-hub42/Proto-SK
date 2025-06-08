import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';




@Component({
  selector: 'app-search-pokemon',
  standalone: false,
  templateUrl: './search-pokemon.component.html',
  styleUrl: './search-pokemon.component.scss'
})
export class SearchPokemonComponent implements OnInit {
  searchTerm = new Subject<string>();
  pokemons$: Observable<Pokemon[]>;


  constructor(private pokemonService: PokemonService, private router: Router) { }

  ngOnInit() {
    this.pokemons$ = this.searchTerm.pipe(
      // On attend 300ms après la dernière saisie de l'utilisateur
      debounceTime(300),
      // On ignore les termes de recherche qui n'ont pas changé depuis la dernière recherche
      distinctUntilChanged(),
      // On utilise switchMap pour annuler la recherche précédente si l'utilisateur tape à nouveau
      switchMap((term) => this.pokemonService.searchPokemonList(term))

    );
  }



  Search(term: string) {
    this.searchTerm.next(term);

  }

  goToPokemonDetails(pokemon: Pokemon) {
    const link = [`/pokemon/${pokemon.id}`];
    this.router.navigate(link);
  }
}