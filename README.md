This repository is the output of the tutorial that could be found on https://angular.io/tutorial/. 

The notes below were gathered with the intention of summarizing the concepts mentioned in the tutorial for future refence and the they are completely taken from https://angular.io/tutorial/ tutorial series and official Angular documentation found in https://angular.io/. Also some other resources are referenced, with a reference link.

# Tour of heroes

By the end of this tutorial you will be able to do the following:

* Use built-in Angular directives to show and hide elements and display lists of hero data.
* Create Angular components to display hero details and show an array of heroes.
* Use one-way data binding for read-only data.
* Add editable fields to update a model with two-way data binding.
* Bind component methods to user events, like keystrokes and clicks.
* Enable users to select a hero from a master list and edit that hero in the details view.
* Format data with pipes.
* Create a shared service to assemble the heroes.
* Use routing to navigate among different views and their components.

# Keywords/Concepts Faced

## Part I
__angular CLI__: 

The Angular CLI is a command-line tool for managing the Angular development cycle.


__application shell__: 

The shell is controlled by an Angular component named AppComponent.


__app.component.ts__: 

The component class code, written in TypeScript.


__app.component.html__: 

The component template, written in HTML.


__app.component.css__: 

The component's private CSS styles.



__angular components__: 

Components are the fundamental building blocks of Angular applications. They display data on the screen, listen for user input, and take action based on that input.


__src/styles.css__: 

Most apps strive for a consistent look across the application. The CLI generated an empty styles.css for this purpose. Put your application-wide styles there.


__interpolation binding__: 

The double curly braces, {{ property }},are Angular's interpolation binding syntax. This interpolation binding presents the component's property value inside the HTML.


__ng generate component heroes__: 

Using the Angular CLI, generate a new component named heroes.


__@Component__: 

@Component is a decorator function that specifies the Angular metadata for the component. You always import the Component symbol from the Angular core library and annotate the component class with @Component.


__selector__: 

The component's CSS element selector.The CSS element selector value, lets say 'app-heroes', matches the name of the HTML element that identifies this component within a parent component's template.


__templateUrl__: 

The location of the component's template file.


__styleUrls__: 

The location of the component's private CSS styles.


__export__:

It enables an Angular module to expose some of its components/directives/pipes to the other modules in the applications. Without it, the components/directives/pipes defined in a module could only be used in that module.<sup><a  href="https://stackoverflow.com/a/41927063" target="_blank">see</a></sup> Always export the component class so you can import it elsewhere ... like in the AppModule.


__UppercasePipe__: 

Pipes are a good way to format strings, currency amounts, dates and other display data. Angular ships with several built-in pipes and you can create your own.

``` html
<h2>{{hero.name | uppercase}} Details</h2>
```


__two-way binding__:  

Two-way binding gives your app a way to share data between a component class and its template.Two-way binding does two things:

* Sets a specific element property.
* Listens for an element change event.

Angular offers a special two-way data binding syntax for this purpose, [()]. The [()] syntax combines the brackets of property binding, [], with the parentheses of event binding, ().

[(ngModel)] is Angular's two-way data binding syntax.

> Although _ngModel_ is a valid Angular directive, it isn't available by default.

> It belongs to the optional FormsModule and you must opt-in to using it.

The following explanation for two-way binding is taken from <a  href="https://blog.thoughtram.io/angular/2016/10/13/two-way-data-binding-in-angular-2.html" target="_blank">here</a>.

In order to understand what that means, let’s take a look at this code snippet here:
``` html
<input [(ngModel)]="username">

<p>Hello {{username}}!</p>
```

Right, this is that one demo that blew our minds back in 2009, implemented in Angular >= 2.x. When typing into the input, the input’s value is written into the username model and then reflected back into the view, resulting in a nice greeting.

How does this all work? Well, as mentioned earlier, __since version 2.x, two-way data binding in Angular really just boils down to property binding and event binding. There is no such thing as two-way data binding__. Without the ngModel directive, we could easily implement two-way data binding just like this:

``` html
<input [value]="username" (input)="username = $event.target.value">

<p>Hello {{username}}!</p>
```


__AppModule__: 

Angular needs to know how the pieces of your application fit together and what other files and libraries the app requires. This information is called metadata.

Some of the metadata is in the @Component decorators that you added to your component classes. Other critical metadata is in @NgModule decorators.

The most important @NgModule decorator annotates the top-level __AppModule__ class.

The Angular CLI generated an AppModule class in src/app/app.module.ts when it created the project. Therefore this is where you opt-in to the -lets say- FormsModule to be able to use Angular's two-way data binding syntax [(ngModel)] in some component of your application.


__NgModule__: 

NgModules configure the injector and the compiler and help organize related things together.

An NgModule is a class marked by the @NgModule decorator. @NgModule takes a metadata object that describes how to compile a component's template and how to create an injector at runtime. It identifies the module's own components, directives, and pipes, making some of them public, through the exports property, so that external components can use them. @NgModule can also add service providers to the application dependency injectors.

Every component must be declared in exactly one NgModule.

You didn't declare the HeroesComponent. So why did the application work?

It worked because the Angular CLI declared HeroesComponent in the AppModule when it generated that component.

Open src/app/app.module.ts and find HeroesComponent imported near the top.

And the HeroesComponent is declared in the @NgModule.declarations array.

_src/app/app.module.ts_
``` typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```


### Part I Summary

* You used the CLI to create a second HeroesComponent.
* You displayed the HeroesComponent by adding it to the AppComponent shell.
* You applied the UppercasePipe to format the name.
* You used two-way data binding with the ngModel directive.
* You learned about the AppModule.
* You imported the FormsModule in the AppModule so that Angular would * recognize and apply the ngModel directive.
* You learned the importance of declaring components in the AppModule and appreciated that the CLI declared it for you.

## Part II

__*ngFor__: 

The *ngFor is Angular's repeater directive. It repeats the host element for each element in a list.

The syntax in this example is as follows:

* \<li> is the host element.
* heroes holds the mock heroes list from the HeroesComponent class, the mock heroes list.
* hero holds the current hero object for each iteration through the list.

> Don't forget the asterisk (*) in front of ngFor. It's a critical part of the syntax.

``` html
<li *ngFor="let hero of heroes">
```


__private stytling__: 

The heroes list should be attractive and should respond visually when users hover over and select a hero from the list.

In the first tutorial, you set the basic styles for the entire application in styles.css. That stylesheet didn't include styles for this list of heroes.

You could add more styles to styles.css and keep growing that stylesheet as you add components.

> You may prefer instead to define private styles for a specific component and keep everything a component needs— the code, the HTML, and the CSS —together in one place.

This approach makes it easier to re-use the component somewhere else and deliver the component's intended appearance even if the global styles are different.

You define private styles either inline in the @Component.styles array or as stylesheet file(s) identified in the @Component.styleUrls array.

When the CLI generated the HeroesComponent, it created an empty heroes.component.css stylesheet for the HeroesComponent and pointed to it in @Component.styleUrls like this.

Open the heroes.component.css file and paste in the private CSS styles for the HeroesComponent. You'll find them in the final code review at the bottom of this guide.

> Styles and stylesheets identified in @Component metadata are scoped to that specific component. The heroes.component.css styles apply only to the HeroesComponent and don't affect the outer HTML or the HTML in any other component.


__event binding__: 

Event binding allows you to listen for certain events such as keystrokes, mouse movements, clicks, and touches.

<p align="center">
<img src="https://angular.io/generated/images/guide/template-syntax/syntax-diagram.svg" alt="Event binding" title="Event binding">
</p>


__*ngIf__: 

A structural directive that conditionally includes a template based on the value of an expression coerced to Boolean. When the expression evaluates to true, Angular renders the template provided in a then clause, and when false or null, Angular renders the template provided in an optional else clause. The default template for the else clause is blank.

The component should only display the selected hero details if the selectedHero exists.

Wrap the hero detail HTML in a <div>. Add Angular's *ngIf directive to the <div> and set it to selectedHero.

Don't forget the asterisk (*) in front of ngIf. It's a critical part of the syntax.

``` html
<div *ngIf="selectedHero">

 ...
    details
 ...

</div>
```


__class binding__: 

It's difficult to identify the selected hero in the list when all \<li> elements look alike.

If the user clicks "Magneta", that hero should render with a distinctive but subtle background color like this:

<p align="center">
<img src="https://angular.io/generated/images/guide/toh/heroes-list-selected.png" alt="Selected hero styling" title="Selected hero styling">
</p>

That selected hero coloring is the work of the .selected CSS class in the styles you added earlier. You just have to apply the .selected class to the \<li> when the user clicks it.

> The Angular class binding makes it easy to add and remove a CSS class conditionally. Just add [class.some-css-class]="some-condition" to the element you want to style.

Add the following [class.selected] binding to the \<li> in the HeroesComponent template:

_[class.selected]="hero === selectedHero"_


<a href="https://angular.io/guide/template-syntax#class-binding">More about class binding<a>


### Part II Summary

* The Tour of Heroes app displays a list of heroes in a Master/Detail view.
* The user can select a hero and see that hero's details.
* You used *ngFor to display a list.
* You used *ngIf to conditionally include or exclude a block of HTML.
* You can toggle a CSS style class with a class binding. 


## Part III

__Input()__: 

Decorator that marks a class field as an input property and supplies configuration metadata. The input property is bound to a DOM property in the template. During change detection, Angular automatically updates the data property with the DOM property's value.


### Part III Summary

* You created a separate, reusable HeroDetailComponent.
* You used a property binding to give the parent HeroesComponent control over the child HeroDetailComponent.
* You used the @Input decorator to make the hero property available for binding by the external HeroesComponent.


## Part IV

__Services__: 

The Tour of Heroes HeroesComponent is currently getting and displaying fake data.

After the refactoring in this tutorial, HeroesComponent will be lean and focused on supporting the view. It will also be easier to unit-test with a mock service.


__Why services?__

> Components shouldn't fetch or save data directly and they certainly shouldn't knowingly present fake data. They should focus on presenting data and delegate data access to a service.

In this tutorial, you'll create a HeroService that all application classes can use to get heroes. __Instead of creating that service with new, you'll rely on Angular dependency injection to inject it into the HeroesComponent constructor.__

Services are a great way to share information among classes that don't know each other. You'll create a MessageService and inject it in two places:

1. in HeroService which uses the service to send a message
2. in MessagesComponent which displays that message

__ng generate service hero__:

Using the Angular CLI, create a service called hero.


__@Injectable() services__: 

Notice that the new service imports the Angular Injectable symbol and annotates the class with the @Injectable() decorator. This marks the class as one that participates in the dependency injection system. The HeroService class is going to provide an injectable service, and it can also have its own injected dependencies. It doesn't have any dependencies yet, but it will soon.

The @Injectable() decorator accepts a metadata object for the service, the same way the @Component() decorator did for your component classes.


__Provide the HeroService__: 

You must make the HeroService available to the dependency injection system before Angular can inject it into the HeroesComponent by registering a __provider__.A provider is something that can create or deliver a service; in this case, it instantiates the HeroService class to provide the service.

To make sure that the HeroService can provide this service, register it with the _injector_, which is the object that is responsible for choosing and injecting the provider where the app requires it.

By default, the Angular CLI command _ng generate service_ registers a provider with the _root injector_ for your service by including provider metadata, that is _providedIn: 'root'_ in the _@Injectable()_ decorator.

``` typescript
 @Injectable({
  providedIn: 'root',
})
```
__When you provide the service at the root level, Angular creates a single, shared instance of HeroService and injects into any class that asks for it. Registering the provider in the @Injectable metadata also allows Angular to optimize an app by removing the service if it turns out not to be used after all.__

_src/app/hero.service.ts_
``` typescript
import { Injectable } from '@angular/core';
import { HEROES } from './mock-heroes';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  getHeroes(): Hero[]{
    return  HEROES;
  }
  constructor() { }
}

```
The HeroService is now ready to plug into the HeroesComponent.

__Inject the HeroService__:

Add a private heroService parameter of type HeroService to the constructor.

_src/app/heroes/heroes.component.ts_
``` typescript
constructor(private heroService: HeroService) { }
```
> The parameter simultaneously defines a private heroService property and identifies it as a HeroService injection site.

> When Angular creates a HeroesComponent, the Dependency Injection system sets the heroService parameter to the singleton instance of HeroService.


__Add getHeroes()__:

Create a function to retrieve the heroes from the service.

_src/app/heroes/heroes.component.ts_
``` typescript
getHeroes(): void {
  this.heroes = this.heroService.getHeroes();
}
```

__Call it in ngOnInit()__:

While you could call getHeroes() in the constructor, __that's not the best practice.__

__Reserve the constructor for simple initialization such as wiring constructor parameters to properties. The constructor shouldn't do anything. It certainly shouldn't call a function that makes HTTP requests to a remote server as a real data service would.__

Instead, call getHeroes() inside the ngOnInit lifecycle hook and let Angular call ngOnInit() at an appropriate time after constructing a HeroesComponent instance.

_src/app/heroes/heroes.component.ts_
``` typescript 
ngOnInit() {
  this.getHeroes();
}
```

__Observable data__:

The HeroService.getHeroes() method has a synchronous signature, which implies that the HeroService can fetch heroes synchronously. The HeroesComponent consumes the getHeroes() result as if heroes could be fetched synchronously.

_src/app/heroes/heroes.component.ts_
``` typescript
this.heroes = this.heroService.getHeroes();

```

This will not work in a real app. You're getting away with it now because the _service_ currently returns _mock heroes_. But soon the app will fetch heroes from a remote server, which is an inherently _asynchronous_ operation.

The _HeroService_ must wait for the server to respond, _getHeroes()_ cannot return immediately with hero data, and the browser will not block while the service waits.

_HeroService.getHeroes()_ must have an asynchronous signature of some kind.

In this tutorial, _HeroService.getHeroes()_ will return an Observable because it will eventually use the Angular _HttpClient.get_ method to fetch the heroes and _HttpClient.get()_ returns an _Observable_.

_Observable HeroService_:

Observable is one of the key classes in the RxJS library.

In a later tutorial on HTTP, you'll learn that Angular's HttpClient methods return RxJS Observables. In this tutorial, you'll simulate getting data from the server with the RxJS _of()_ function.

of(HEROES) returns an Observable<Hero[]> that emits __a single value__, the array of mock heroes.

> In the HTTP tutorial, you'll call HttpClient.get<Hero[]>() which also returns an Observable<Hero[]> that emits a single value, an array of heroes from the body of the HTTP response.

__Subscribe in HeroesComponent__:

The HeroService.getHeroes method used to return a Hero[]. Now it returns an Observable<Hero[]>.

You'll have to adjust to that difference in HeroesComponent as follows.

#src/app/heroes/heroes.component.ts
``` typescript
getHeroes(): void {
  this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
}
```
Observable.subscribe() is the __critical difference__.

The previous version assigns an array of heroes to the component's heroes property. The assignment occurs synchronously, as if the server could return heroes instantly or the browser could freeze the UI while it waited for the server's response.

That _won't work_ when the HeroService is actually making requests of a remote server.

The new version waits for the Observable to emit the array of heroes—which could happen now or several minutes from now. The subscribe() method passes the emitted array to the callback, which sets the component's heroes property.

This asynchronous approach will work when the HeroService requests heroes from the server.

__Show messages__:

This section guides you through the following:

* adding a MessagesComponent that displays app messages at the bottom of the screen
* creating an injectable, app-wide MessageService for 
sending messages to be displayed
* injecting MessageService into the HeroService
* displaying a message when HeroService fetches heroes successfully


__ng generate component messages__:

Use the CLI to create the MessagesComponent. The CLI creates the component files in the src/app/messages folder and declares the MessagesComponent in AppModule.

Modify the AppComponent template to display the generated MessagesComponent.

_src/app/app.component.html_
``` html
<h1>{{title}}</h1>
<app-heroes></app-heroes>
<app-messages></app-messages>
```

__ng generate service message__:

Use the CLI to create the MessageService in src/app.

After defining it's messages property and  add, clear methods; inject it into HeroService.

Modify the constructor with a parameter that declares a private messageService property. Angular will inject the singleton MessageService into that property when it creates the HeroService.

> This is a typical "service-in-service" scenario: you inject the MessageService into the HeroService which is injected into the HeroesComponent.

__Send a message from HeroService__:
Modify the getHeroes() method to send a message when the heroes are fetched.

_src/app/hero.service.ts_
``` typescript
getHeroes(): Observable<Hero[]> {
  // TODO: send the message _after_ fetching the heroes
  this.messageService.add('HeroService: fetched heroes');
  return of(HEROES);
}
```

_Display the message from HeroService_:
The MessagesComponent should display all messages, including the message sent by the HeroService when it fetches heroes.

Open MessagesComponent and import the MessageService.

_src/app/messages/messages.component.ts_
``` typescript
import { MessageService } from '../message.service';
```

Modify the constructor with a parameter that declares a public messageService property. Angular will inject the singleton MessageService into that property when it creates the MessagesComponent.

_src/app/messages/messages.component.ts_
``` typescript
constructor(public messageService: MessageService) {}
```
The messageService property must be public because you're going to bind to it in the template.

> Angular only binds to public component properties.


__Bind to the MessageService__:

_src/app/messages/messages.component.html_
``` html
<div *ngIf="messageService.messages.length">

  <h2>Messages</h2>
  <button class="clear"
          (click)="messageService.clear()">clear</button>
  <div *ngFor='let message of messageService.messages'> {{message}} </div>

</div>
```
This template binds directly to the component's messageService.

* The *ngIf only displays the messages area if there are messages to show.
* An *ngFor presents the list of messages in repeated \<div> elements.
* An Angular event binding binds the button's click event to MessageService.clear().

The messages will look better when you add the private CSS styles to messages.component.css as listed in one of the "final code review" tabs below.

The browser refreshes and the page displays the list of heroes. Scroll to the bottom to see the message from the HeroService in the message area. Click the "clear" button and the message area disappears.

### Part IV Summarry

* You refactored data access to the HeroService class.
* You registered the HeroService as the provider of its service at the root level so that it can be injected anywhere in the app.
* You used Angular Dependency Injection to inject it into a component.
* You gave the HeroService get data method an asynchronous signature.
* You discovered Observable and the RxJS Observable library.
* You used RxJS of() to return an observable of mock heroes (Observable<Hero[]>).
* The component's ngOnInit lifecycle hook calls the HeroService method, not the constructor.
* You created a MessageService for loosely-coupled communication between classes.
* The HeroService injected into a component is created with another injected service, MessageService.


## Part V (Routing)
(! This part consists of important key concepts to grasp about routing : see
https://angular.io/tutorial/toh-pt5)

In Angular, the best practice is to load and configure the router in a separate, top-level module that is dedicated to routing and imported by the root AppModule.

By convention, the module class name is AppRoutingModule and it belongs in the app-routing.module.ts in the src/app folder.

__ng generate module app-routing --flat --module=app__: Angular CLI command to generate our routing module at the application level.

> --flat puts the file in src/app instead of its own folder.
> --module=app tells the CLI to register it in the imports array of the AppModule.

_src/app/app-routing.module.ts (updated)_

``` typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

First, AppRoutingModule imports RouterModule and Routes so the app can have routing functionality. The next import, HeroesComponent, will give the Router somewhere to go once you configure the routes.

Notice that the CommonModule references and declarations array are unnecessary, so are no longer part of AppRoutingModule. The following sections explain the rest of the AppRoutingModule in more detail.

__routes__:

A typical Angular Route has two properties:

* path: a string that matches the URL in the browser address bar.
* component: the component that the router should create when navigating to this route.

This tells the router to match that URL to path: 'heroes' and display the HeroesComponent when the URL is something like localhost:4200/heroes.

__RouterModule.forRoot()__:

The @NgModule metadata initializes the router and starts it listening for browser location changes.

The following line adds the RouterModule to the AppRoutingModule imports array and configures it with the routes in one step by calling RouterModule.forRoot():

_src/app/app-routing.module.ts_
``` typescript
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
```
> The method is called forRoot() because you configure the router at the application's root level. The forRoot() method supplies the service providers and directives needed for routing, and performs the initial navigation based on the current browser URL.

Next, AppRoutingModule exports RouterModule so it will be available throughout the app.

__Add RouterOutlet__:

Open the AppComponent template and replace the \<app-heroes> element with a \<router-outlet> element.

_src/app/app.component.html (router-outlet)_
``` html
<h1>{{title}}</h1>
<router-outlet></router-outlet>
<app-messages></app-messages>
```
The \<router-outlet> tells the router where to display routed views.

> The RouterOutlet is one of the router directives that became available to the AppComponent because AppModule imports AppRoutingModule which exported RouterModule.


__routerLink__:

A routerLink attribute is set to "/heroes", the string that the router matches to the route to HeroesComponent. The routerLink is the selector for the RouterLink directive that turns user clicks into router navigations. It's another of the public directives in the RouterModule.

The browser refreshes and displays the app title and heroes link, but not the heroes list.

Click the link. The address bar updates to /heroes and the list of heroes appears.

__ng generate component dashboard__:

Angular CLI command for adding DashboardComponent.

__default route__:

When the app starts, the browser's address bar points to the web site's root. That doesn't match any existing route so the router doesn't navigate anywhere. The space below the <router-outlet> is blank.

To make the app navigate to the dashboard automatically, add the following route to the AppRoutingModule.Routes array.

_src/app/app-routing.module.ts_
``` typescript
{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
```
This route redirects a URL that fully matches the empty path to the route whose path is '/dashboard'.

After the browser refreshes, the router loads the DashboardComponent and the browser address bar shows the /dashboard URL.

__hero details__:

The HeroDetailsComponent displays details of a selected hero. At the moment the HeroDetailsComponent is only visible at the bottom of the HeroesComponent

The user should be able to get to these details in three ways.

* By clicking a hero in the dashboard.
* By clicking a hero in the heroes list.
* By pasting a "deep link" URL into the browser address bar that identifies the hero to display.

In this section, you'll enable navigation to the HeroDetailsComponent and liberate it from the HeroesComponent.

__routing with parameter__:

_src/app/app-routing.module.ts_
``` typescript
{ path: 'detail/:id', component: HeroDetailComponent },
```
The colon (:) in the path indicates that :id is a placeholder for a specific hero id.


__interpolation binding {{ }}__:

``` html
<a *ngFor="let hero of heroes" class="col-1-4"
    routerLink="/detail/{{hero.id}}">
  <div class="module hero">
    <h4>{{hero.name}}</h4>
  </div>
</a>
```

__routable HeroDetailComponent__:

Previously, the parent HeroesComponent set the HeroDetailComponent.hero property and the HeroDetailComponent displayed the hero.

HeroesComponent doesn't do that anymore. Now the router creates the HeroDetailComponent in response to a URL such as ~/detail/11.

The HeroDetailComponent needs a new way to obtain the hero-to-display. This section explains the following:

* __Get the route that created it__
* Extract the id from the route
* Acquire the hero with that id from the server via the HeroService

Add the following imports:

_src/app/hero-detail/hero-detail.component.ts_
``` typescript
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService }  from '../hero.service';
```

Inject the ActivatedRoute, HeroService, and Location services into the constructor, saving their values in private fields:

_src/app/hero-detail/hero-detail.component.ts_
``` typescript
constructor(
  private route: ActivatedRoute,
  private heroService: HeroService,
  private location: Location
) {}
```

__The ActivatedRoute holds information about the route to this instance of the HeroDetailComponent. This component is interested in the route's parameters extracted from the URL. The "id" parameter is the id of the hero to display.__

The HeroService gets hero data from the remote server and this component will use it to get the hero-to-display.

The location is an Angular service for interacting with the browser. You'll use it later to navigate back to the view that navigated here.

__Extract the id route parameter__:

In the ngOnInit() lifecycle hook call getHero() and define it as follows.


_src/app/hero-detail/hero-detail.component.ts_
``` typescript
ngOnInit(): void {
  this.getHero();
}

getHero(): void {
  const id = +this.route.snapshot.paramMap.get('id');
  this.heroService.getHero(id)
    .subscribe(hero => this.hero = hero);
}
```

The __route.snapshot__ is a static image of the route information shortly after the component was created.

The paramMap is a dictionary of route parameter values extracted from the URL. The "id" key returns the id of the hero to fetch.

Route parameters are always strings. The JavaScript (+) operator converts the string to a number, which is what a hero id should be.

The browser refreshes and the app crashes with a compiler error. HeroService doesn't have a getHero() method. Add it now.

__Add HeroService.getHero()__:

Open HeroService and add the following getHero() method with the id after the getHeroes() method:

_src/app/hero.service.ts (getHero)_
``` typescript
getHero(id: number): Observable<Hero> {
  // TODO: send the message _after_ fetching the hero
  this.messageService.add(`HeroService: fetched hero id=${id}`);
  return of(HEROES.find(hero => hero.id === id));
}
```
> Note the backticks ( ` ) that define a JavaScript template literal for embedding the id.

Like getHeroes(), getHero() has an asynchronous signature. It returns a mock hero as an Observable, using the RxJS of() function.

You'll be able to re-implement getHero() as a real Http request without having to change the HeroDetailComponent that calls it.

__finding the way back__

By clicking the browser's back button, you can go back to the hero list or dashboard view, depending upon which sent you to the detail view.

It would be nice to have a button on the HeroDetail view that can do that.

Add a go back button to the bottom of the component template and bind it to the component's goBack() method.

_src/app/hero-detail/hero-detail.component.html (back button)_
``` html
<button (click)="goBack()">go back</button>
```

_src/app/hero-detail/hero-detail.component.ts (goBack)_
``` typescript
goBack(): void {
  this.location.back();
}
```

Users can navigate around the app, from the dashboard to hero details and back, from heroes list to the mini detail to the hero details and back to the heroes again.

### Part V Summary
* You added the Angular router to navigate among different components.
* You turned the AppComponent into a navigation shell with <a> links and a <router-outlet>.
* You configured the router in an AppRoutingModule
* You defined simple routes, a redirect route, and a parameterized route.
* You used the routerLink directive in anchor elements.
* You refactored a tightly-coupled master/detail view into a routed detail view.
* You used router link parameters to navigate to the detail view of a user-selected hero.
* You shared the HeroService among multiple components.

