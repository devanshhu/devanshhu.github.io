import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class HelperService {
  public isHomeVisited: boolean = false;
  public isLightTheme: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public isMobile: boolean = false;
  public stateChange: Subject<any> = new Subject<any>();
  public toChandrayan: Subject<any> = new Subject<any>();

  constructor() { }

  isMobileCheck() {
    const regex =
      /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
  }
}
