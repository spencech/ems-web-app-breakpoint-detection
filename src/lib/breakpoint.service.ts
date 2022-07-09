import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, throwError, of } from 'rxjs';
import { Breakpoint } from "./breakpoint.interfaces";

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {

  private currentBreakpointSource:BehaviorSubject<Breakpoint | undefined> = new BehaviorSubject< Breakpoint | undefined>(undefined);
  public currentBreakpoint = this.currentBreakpointSource.asObservable();

  constructor() { }

  public setCurrentBreakpoint(bp: Breakpoint | undefined) {
    this.currentBreakpointSource.next(bp);
  }
}
