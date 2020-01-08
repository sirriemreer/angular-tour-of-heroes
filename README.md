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
__angular CLI__: The Angular CLI is a command-line tool for managing the Angular development cycle.

__application shell__: The shell is controlled by an Angular component named AppComponent.

__app.component.ts__: the component class code, written in TypeScript.

__app.component.html__: the component template, written in HTML.

__app.component.css__: the component's private CSS styles.


__angular components__: Components are the fundamental building blocks of Angular applications. They display data on the screen, listen for user input, and take action based on that input.

__src/styles.css__: Most apps strive for a consistent look across the application. The CLI generated an empty styles.css for this purpose. Put your application-wide styles there.

__interpolation binding__: The double curly braces, {{ property }},are Angular's interpolation binding syntax. This interpolation binding presents the component's property value inside the HTML.

__ng generate component heroes__: Using the Angular CLI, generate a new component named heroes.

__@Component__: @Component is a decorator function that specifies the Angular metadata for the component. You always import the Component symbol from the Angular core library and annotate the component class with @Component.

__selector__: The component's CSS element selector.The CSS element selector value, lets say 'app-heroes', matches the name of the HTML element that identifies this component within a parent component's template.

__templateUrl__: The location of the component's template file.

__styleUrls__: The location of the component's private CSS styles.

__export__: It enables an Angular module to expose some of its components/directives/pipes to the other modules in the applications. Without it, the components/directives/pipes defined in a module could only be used in that module.<sup><a  href="https://stackoverflow.com/a/41927063" target="_blank">see</a></sup> Always export the component class so you can import it elsewhere ... like in the AppModule.

__UppercasePipe__: Pipes are a good way to format strings, currency amounts, dates and other display data. Angular ships with several built-in pipes and you can create your own.

``` html
<h2>{{hero.name | uppercase}} Details</h2>
```

__two-way binding__:  Two-way binding gives your app a way to share data between a component class and its template.Two-way binding does two things:

* Sets a specific element property.
* Listens for an element change event.

Angular offers a special two-way data binding syntax for this purpose, [()]. The [()] syntax combines the brackets of property binding, [], with the parentheses of event binding, ().

[(ngModel)] is Angular's two-way data binding syntax.

==Although _ngModel_ is a valid Angular directive, it isn't available by default.==

==It belongs to the optional FormsModule and you must opt-in to using it.==

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

__AppModule__: Angular needs to know how the pieces of your application fit together and what other files and libraries the app requires. This information is called metadata.

Some of the metadata is in the @Component decorators that you added to your component classes. Other critical metadata is in @NgModule decorators.

The most important @NgModule decorator annotates the top-level __AppModule__ class.

The Angular CLI generated an AppModule class in src/app/app.module.ts when it created the project. Therefore this is where you opt-in to the -lets say- FormsModule to be able to use Angular's two-way data binding syntax [(ngModel)] in some component of your application.


__NgModule__: NgModules configure the injector and the compiler and help organize related things together.

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

__*ngFor__: The *ngFor is Angular's repeater directive. It repeats the host element for each element in a list.

The syntax in this example is as follows:

* \<li> is the host element.
* heroes holds the mock heroes list from the HeroesComponent class, the mock heroes list.
* hero holds the current hero object for each iteration through the list.

==Don't forget the asterisk (*) in front of ngFor. It's a critical part of the syntax.==

``` html
<li *ngFor="let hero of heroes">
```

__private stytling__: The heroes list should be attractive and should respond visually when users hover over and select a hero from the list.

In the first tutorial, you set the basic styles for the entire application in styles.css. That stylesheet didn't include styles for this list of heroes.

You could add more styles to styles.css and keep growing that stylesheet as you add components.

==You may prefer instead to define private styles for a specific component and keep everything a component needs— the code, the HTML, and the CSS —together in one place.

This approach makes it easier to re-use the component somewhere else and deliver the component's intended appearance even if the global styles are different.==

You define private styles either inline in the @Component.styles array or as stylesheet file(s) identified in the @Component.styleUrls array.

When the CLI generated the HeroesComponent, it created an empty heroes.component.css stylesheet for the HeroesComponent and pointed to it in @Component.styleUrls like this.

Open the heroes.component.css file and paste in the private CSS styles for the HeroesComponent. You'll find them in the final code review at the bottom of this guide.

==Styles and stylesheets identified in @Component metadata are scoped to that specific component. The heroes.component.css styles apply only to the HeroesComponent and don't affect the outer HTML or the HTML in any other component.==

__event binding__: Event binding allows you to listen for certain events such as keystrokes, mouse movements, clicks, and touches.

<p align="center">
<img src="https://angular.io/generated/images/guide/template-syntax/syntax-diagram.svg" alt="Event binding" title="Event binding">
</p>


__*ngIf__: A structural directive that conditionally includes a template based on the value of an expression coerced to Boolean. When the expression evaluates to true, Angular renders the template provided in a then clause, and when false or null, Angular renders the template provided in an optional else clause. The default template for the else clause is blank.

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

==The Angular class binding makes it easy to add and remove a CSS class conditionally. Just add [class.some-css-class]="some-condition" to the element you want to style.==

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

 __Input()__: Decorator that marks a class field as an input property and supplies configuration metadata. The input property is bound to a DOM property in the template. During change detection, Angular automatically updates the data property with the DOM property's value.

 ### Part III Summary

* You created a separate, reusable HeroDetailComponent.
* You used a property binding to give the parent HeroesComponent control over the child HeroDetailComponent.
* You used the @Input decorator to make the hero property available for binding by the external HeroesComponent.
