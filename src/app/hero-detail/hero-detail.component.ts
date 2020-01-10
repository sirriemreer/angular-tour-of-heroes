import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero;
  
  getHero(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(
      hero => {
        this.messageService.add(`DetailsComponent: hero id=${id} taken`);
        this.hero = hero
      }
    );
  }

  goBack(){
    this.location.back();
  }

  constructor(private route: ActivatedRoute,
    private location: Location,
    private heroService: HeroService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.getHero();
  }

}
