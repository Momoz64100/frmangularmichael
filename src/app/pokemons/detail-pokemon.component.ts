import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Pokemon } from './pokemon';
import { PokemonService } from './pokemon.service';

@Component({
    selector: 'detail-pokemon',
    templateUrl: './detail-pokemon.component.html'
})
export class DetailPokemonComponent implements OnInit {
    pokemon: Pokemon;

    constructor(
        private route: ActivatedRoute, 
        private router: Router,
        private _pokemonService: PokemonService
        ) { }

    ngOnInit() {
        let id = +this.route.snapshot.paramMap.get('id');
        this._pokemonService.getPokemon(id).subscribe(data => {
            this.pokemon = data;
        });
    }

    goBack() {
		this.router.navigate(['/pokemon/all']);
    }

    goEdit(pokemon: Pokemon) {
        let link = ['/pokemon/edit', pokemon.id];
        this.router.navigate(link);
    }

    deletePokemon(pokemonId: number) {
        this._pokemonService.deletePokemon(pokemonId).subscribe(() => this.goBack());
    }
}