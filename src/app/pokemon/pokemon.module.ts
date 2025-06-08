import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BorderCardDirective } from './border-card.directive';
import { DetailPokemonComponent } from './detail-pokemon.component';
import { ListPokemonComponent } from './list-pokemon.component';
import { PokemonTypeColorPipe } from './pokemon-type-color.pipe';
import { RouterModule, Routes } from '@angular/router';
import { PokemonService } from './pokemon.service';
import { FormsModule } from '@angular/forms';
import { PokemonFormComponent } from './pokemon-form/pokemon-form.component';
import { EditPokemonComponent } from './edit-pokemon/edit-pokemon.component';
import { AddPokemonComponent } from './add-pokemon/add-pokemon.component';
import { SearchPokemonComponent } from './search-pokemon/search-pokemon.component';
import { LoaderComponent } from './loader/loader.component';
import { AuthGuard } from '../auth.guard'; // Assurez-vous que le guard est importé si nécessaire


const pokemonRoutes: Routes = [
  // Route de connexion
  { path: 'edit/pokemon/:id', component: EditPokemonComponent, canActivate: [AuthGuard] }, // Utilisation du guard
  { path: 'pokemon/add', component: AddPokemonComponent, canActivate: [AuthGuard] },
  { path: 'pokemons', component: ListPokemonComponent, canActivate: [AuthGuard] },
  { path: 'pokemons/:id', component: DetailPokemonComponent, canActivate: [AuthGuard] },

];

@NgModule({
  declarations: [
    BorderCardDirective, // Directive pour le style des cartes Pokémon
    DetailPokemonComponent, // Composant pour afficher les détails d'un Pokémon
    ListPokemonComponent, // Composant pour lister les Pokémon
    PokemonTypeColorPipe, // Pipe pour colorer les types de Pokémon
    PokemonFormComponent, // Composant de formulaire pour les Pokémon
    EditPokemonComponent, // Composant pour éditer un Pokémon
    AddPokemonComponent, // Composant pour ajouter un Pokémon
    SearchPokemonComponent, // Composant pour rechercher des Pokémon
    LoaderComponent, // Composant pour afficher un loader


  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(pokemonRoutes)
  ],
  exports: [
    PokemonTypeColorPipe // <-- ajoute ceci si besoin
  ],
  providers: [PokemonService]
})
export class PokemonModule { }
