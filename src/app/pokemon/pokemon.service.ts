import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { HttpClient, } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { POKEMONS } from './mock-pokemon-list';





@Injectable()
export class PokemonService {

  constructor(private http: HttpClient) { }
  // Récupère la liste des Pokémon
  getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>('api/pokemons').pipe(
      tap((PokemonList) => console.table(PokemonList)),
      catchError((error) => {
        console.log(error);
        return of([]); // Retourne une liste de Pokémon par défaut en cas d'erreur
      })
    );
  }
  // Récupère un Pokémon par son ID
  getPokemonById(pokemonId: number): Observable<Pokemon | undefined> {
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      catchError((error) => {
        console.log(error);
        return of(undefined);
      })
    )
  }
  // Met à jour un Pokémon existant
  updatePokemon(pokemon: Pokemon): Observable<Pokemon> {
    return this.http.put<Pokemon>(`api/pokemons/${pokemon.id}`, pokemon).pipe(
      tap((updatedPokemon) => console.log(`Updated Pokemon: ${updatedPokemon.name}`)),
      catchError((error) => {
        console.error(error);
        return of(pokemon); // Retourne le Pokémon original en cas d'erreur
      })
    );
  }
  // Ajoute un nouveau Pokémon
  addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    return this.http.post<Pokemon>('api/pokemons', pokemon).pipe(
      tap((newPokemon) => console.log(`Added Pokemon: ${newPokemon.name}`)),
      catchError((error) => {
        console.error(error);
        return of(pokemon); // Retourne le Pokémon original en cas d'erreur
      })
    );
  }
  // Supprime un Pokémon par son ID
  deletePokemonById(pokemonId: number): Observable<null> {
    return this.http.delete<null>(`api/pokemons/${pokemonId}`).pipe(
      tap((deletePokemon) => console.log(`Deleted Pokemon with id: ${pokemonId}`)),
      catchError((error) => {
        console.error(error);
        return of(null); // Retourne null en cas d'erreur
      })
    );
  }

  // Recherche des Pokémon par nom
  searchPokemonList(term: string): Observable<Pokemon[]> {
    if (term.length <= 1) {
      return of([]); // Retourne une liste vide si le terme de recherche est trop court
    }
    return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
      tap((PokemonList) => console.log(`Found Pokemon matching "${term}":`, PokemonList)),
      catchError((error) => {
        console.error(error);
        return of([]); // Retourne une liste vide en cas d'erreur
      })
    );
  }




  // Retourne la liste des types de Pokémon
  getPokemonTypeList(): string[] {
    return ['plante',
      'feu',
      'eau',
      'insecte',
      'elec',
      'spectre'];
  }
}
