import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];

  getHeroes(): void{
    this.heroService.getHeroes()
    .subscribe(
      heroes =>{
        this.messageService.add("HeroesComponent: heroes taken");        
        this.heroes = heroes;
      } 
    );
    
  }

  constructor(private heroService: HeroService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.getHeroes();
  }

}