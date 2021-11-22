import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styleUrls: ['./search-pokemon.component.scss']
})
export class SearchPokemonComponent implements OnInit {

  private searchTerms = new Subject<string>();
  pokemons$: Observable<Pokemon[]>;

  constructor(
    private _pokemonService: PokemonService,
    private router: Router) { }

  search(term: string) {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.pokemons$ = this.searchTerms.pipe(
      // delai 300ms entre chaque requête
      debounceTime(300),
      // ignorer la recherche en cours si c'est la même que la précedente
      distinctUntilChanged(),
      // retourne la liste des résultats
      switchMap((term: string) => this._pokemonService.searchPokemons(term))
    );
  }

  goDetail(pokemon: Pokemon) {
    let link = ['/pokemon', pokemon.id];
    this.router.navigate(link);
  }
}
