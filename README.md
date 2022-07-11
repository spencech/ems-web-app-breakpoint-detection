# EMS Web Application Components: Breakpoint Change Detection

The Breakpoint Change Detection Angular.io module is authored for use within web applications developed by [Educational Media Solutions](https://educationalmediasolutions.com).

Find the [web application template source code on GitHub](https://github.com/spencech/ems-web-app-template) to review implementation in context.

Find a [working example of this component here](https://ems-web-app.educationalmediasolutions.com).

This package includes a component and service that can be used to define and listen for breakpoint events (i.e., when a user resizes their window/view portal across one or more thresholds). 

**Note:** The service observable fires **only** on breakpoint change, not on every viewport resize event.

**This isn't my favorite component.** Anything display related should be handled via CSS. However, there are some form-factor/viewport-size specific functional changes required by clients from time to time, and this detection mechanism can be helpful in those cases.

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.0.


## Usage: Module Import

	import { NgModule } from '@angular/core';
	import { BrowserModule } from '@angular/platform-browser';
	import { AppComponent } from './app.component';
	import { BreakpointModule, BreakpointService } from "ems-web-app-breakpoint-detection";

	@NgModule({
	  declarations: [
	    AppComponent 
	  ],
	  imports: [
	    BrowserModule,
	    BreakpointModule 
	  ],
	  providers: [ BreakpointService ],
	  bootstrap: [ AppComponent ]
	})
	export class AppModule { }


## Usage: Template Implementation
	
	<breakpoint [breakpoints]="{ xs: 0, sm: 544, md: 768, lg: 992, xl: 1200 }"></breakpoint>

The breakpoints input is shown in its default configuration here. You can use whatever conventions you like for defining key/value pairs on the input.

E.g., 

	<breakpoint [breakpoints]="{ mySmallestBp: 0, myMediumBp: 800, myLargestBp: 1600 }"></breakpoint>

Numeric values correspond to pixels. The default inputs correspond fairly well to phone portrait, phone landscape, tablet portrait, tablet landscape and desktop pixel widths. (Though some of the larger, wider phones get caught as "md" in portrait mode).

** Component Implementation **

## Usage: Component Implementation

	import { Component, OnInit } from '@angular/core';
	import { BreakpointService, Breakpoint } from "ems-web-app-breakpoint-detection";

	@Component({
	  selector: 'app-root',
	  templateUrl: './app.component.html',
	  styleUrls: ['./app.component.less']
	})
	export class AppComponent implements OnInit  {
	  constructor(private breakpointService: BreakpointService) { }
	  
	  ngOnInit() {
	    this.breakpointService.currentBreakpoint.subscribe((bp?: Breakpoint) => {
	      console.log(bp?.type); // e.g., "sm"
	      console.log(bp?.value); // e.g., 544
	    })
	  }
	}

## Convenience Enums

For readability, we use convenience enums that correspond to the internal defaults.

**Enum Definition**

	enum BreakpointType {
	  PhonePortrait = "xs",
	  PhoneLandscape = "sm",
	  TabletPortrait = "md",
	  TabletLandscape = "lg",
	  Desktop = "xl"
	}

	enum BreakpointValue {
	  PhonePortrait = 0,
	  PhoneLandscape = 544,
	  TabletPortrait = 768,
	  TabletLandscape = 992,
	  Desktop = 1200
	}


	import { Component, OnInit } from '@angular/core';
	import { BreakpointService, Breakpoint, BreakpointType, BreakpointValue } from "ems-web-app-breakpoint-detection";

	@Component({
	  selector: 'app-root',
	  templateUrl: './app.component.html',
	  styleUrls: ['./app.component.less']
	})
	export class AppComponent implements OnInit  {
	  constructor(private breakpoint: BreakpointService) { }
	  
	  ngOnInit() {
	    this.breakpoint.currentBreakpoint.subscribe((bp?: Breakpoing) => {
	      console.log(bp?.value < BreakpointValue.TabletPortrait); // e.g., true
	      console.log(bp?.type === BreakpointType.PhoneLandscape); //e.g., true
	    })
	  }
	}


## Code scaffolding

Run `ng generate component component-name --project breakpoint` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project breakpoint`.
> Note: Don't forget to add `--project breakpoint` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build breakpoint` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build breakpoint`, go to the dist folder `cd dist/breakpoint` and run `npm publish`.

## Running unit tests

Run `ng test breakpoint` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
