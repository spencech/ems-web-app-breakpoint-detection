import { Component, OnInit, AfterViewInit, OnDestroy, Input, HostListener } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BreakpointService } from "./breakpoint.service";

@Component({
  selector: 'breakpoint',
  template: `<span *ngFor="let breakpoint of list" [ngClass]="breakpoint[0]" class="breakpoint" aria-hidden="true"></span><div class="style-container" [innerHtml]="styles"></div>`,
  styles: []
})
export class BreakpointComponent implements OnInit, AfterViewInit {

  @Input("breakpoints") breakpoints: Record<string, number> = {
    "xs": 0,
    "sm": 544,
    "md": 768,
    "lg": 992,
    "xl": 1200
  };

  public list: [string, number][] = [];
  public styles!: SafeHtml;

  private currentBreakpoint: string | undefined;

  constructor(private service: BreakpointService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.list = Object.entries(this.breakpoints);
    this.list.sort((a, b) => {
      if(a[1] > b[1]) return 1;
      if(a[1] < b[1]) return -1;
      return 0;
    });
    this.initializeStyles();
  }

  ngAfterViewInit() {
    window.setTimeout(() => this.calculateBreakpoint());
  }

  @HostListener('window:resize', ['$event'])
  onResize = (event: Event) => {
    this.calculateBreakpoint();
  }

  private initializeStyles() {
    let output = "";

    this.list.forEach((breakpoint: any) => {
      output += `.breakpoint.${breakpoint[0]} {  display: none; } `;
    });

    this.list.forEach((breakpoint: any) => {
      output += ` @media only screen and (min-width: ${breakpoint[1]}px) {
                    .breakpoint.${breakpoint[0]} { 
                      display: block;
                    }
                  } `;
    });

    this.styles = this.sanitizer.bypassSecurityTrustHtml(`<style>${output}</style>`);
  }

  private calculateBreakpoint() {
    const breakpoints = this.list.slice();
    let breakpoint = breakpoints.pop();
    while(breakpoint) {
      const style = window.getComputedStyle(document.querySelector(`.breakpoint.${breakpoint[0]}`)!).display;
      if(style === "block") {
        if(this.currentBreakpoint === breakpoint[0]) return;
        this.currentBreakpoint = breakpoint[0];
        this.service.setCurrentBreakpoint({type: breakpoint[0], value: breakpoint[1]});
        return;
      }
      breakpoint = breakpoints.pop();
    }
    this.service.setCurrentBreakpoint(undefined);
  }
}
