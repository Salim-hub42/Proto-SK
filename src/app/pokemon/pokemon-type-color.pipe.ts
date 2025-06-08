import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonTypeColor',
  standalone: false
})
export class PokemonTypeColorPipe implements PipeTransform {

  transform(type: string): string {

    let color: string;

    switch (type.toLowerCase()) {
      case 'plante':
        color = '#78C850';
        break;
      case 'feu':
        color = '#F44336';
        break;
      case 'eau':
        color = '#6890F0';
        break;
      case 'insecte':
        color = '#A8B820';
        break;
      case 'elec':
        color = '#F8D030';
        break;
      case 'spectre':
        color = '#A040A0';
        break;
      default:
        color = '#009688';
        break;
    }
    return color;
  }
}
