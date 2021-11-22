import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-edit-pokemon',
  templateUrl: './edit-pokemon.component.html',
  styleUrls: ['./edit-pokemon.component.scss']
})
export class EditPokemonComponent implements OnInit {
  pokemon: Pokemon = null;

  constructor(private route: ActivatedRoute, 
    private _pokemonService: PokemonService) { }

  ngOnInit() {
    this._pokemonService.getPokemon(+this.route.snapshot.params['id']).subscribe(data => {
      this.pokemon = data;
    });
  }
}
