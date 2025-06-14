import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';



@Component({
  selector: 'app-pokemon-form',
  standalone: false,
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.scss'],
})
export class PokemonFormComponent implements OnInit {


  @Input() pokemon: Pokemon;
  types: string[];
  isAddForm: boolean;
  constructor(private pokemonService: PokemonService, private router: Router) { }





  ngOnInit() {
    this.types = this.pokemonService.getPokemonTypeList();
    this.isAddForm = this.router.url.includes('add');
  }





  hasType(type: string): boolean {
    return this.pokemon.types.includes(type);
  }


  selectType($event: Event, type: string) {
    const isChecked = ($event.target as HTMLInputElement).checked;
    if (isChecked) {
      if (!this.pokemon.types.includes(type)) {
        this.pokemon.types.push(type);
      }
    } else {
      const index = this.pokemon.types.indexOf(type);
      if (index > -1) {
        this.pokemon.types.splice(index, 1);
      }
    }
  }

  isTypesValid(type: string): boolean {

    if (this.pokemon.types.length == 1 && this.hasType(type)) {
      return false;
    }

    if (this.pokemon.types.length > 2 && !this.hasType(type)) {
      return false;
    }
    return true;
  }


  onSubmit() {
    if (this.isAddForm) {
      this.pokemonService.addPokemon(this.pokemon).subscribe((pokemon: Pokemon) => {
        this.router.navigate(['/pokemons', pokemon.id]);
      }
      );
    }
    else {
      this.pokemonService.updatePokemon(this.pokemon).subscribe((pokemon: Pokemon) => {
        this.router.navigate(['/pokemons', this.pokemon.id]);
      });
    }
  }
}

