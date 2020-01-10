import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];
  
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(
        heroes =>{
          this.messageService.add("DashboardComponent: heroes taken");        
          this.heroes = heroes.slice(1, 5);
        }        
      );
        
  }

  constructor(private heroService: HeroService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.getHeroes();
  }

}
