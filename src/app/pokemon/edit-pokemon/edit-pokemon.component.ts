import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';


@Component({
  selector: 'app-edit-pokemon',
  standalone: false,
  templateUrl: './edit-pokemon.component.html',
  styleUrls: ['./edit-pokemon.component.scss'],

})
export class EditPokemonComponent implements OnInit {

  pokemon: Pokemon | undefined;

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) { }


  ngOnInit() {
    const pokemonId: string | null = this.route.snapshot.params['id'];
    if (pokemonId) {
      this.pokemonService.getPokemonById(+pokemonId)
        .subscribe(pokemon => this.pokemon = pokemon ? pokemon : undefined);

    } else {
      this.pokemon = undefined;
    }
  }



}
