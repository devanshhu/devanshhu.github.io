import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { HelperService } from 'src/app/helper.service';
// import { ParticlesFlower } from 'src/helpers/ParticleFlower/ParticleFlower';
// import { Rain } from 'src/helpers/Rain';
import { Chandrayan } from 'src/helpers/chandrayan/Chandrayan';
// import * as THREE from 'three';

@Component({
  selector: 'app-displacement-sphere',
  templateUrl: './displacement-sphere.component.html',
  styleUrls: ['./displacement-sphere.component.scss'],
})
export class DisplacementSphereComponent implements OnInit, OnDestroy {
  isMobile: any = false;

  headingArray: string[] = 'Chandrayaan III'.split('');
  headingText = '';
  textCounter = 0;
  showHeadingTypewriter = true;

  bodyArray: string[] =
    `ISRO, the Indian Space Agency Announced The 3rd Lunar Exploration Program Named " Chandrayaan 3 " on July 6. With A Budget of ₹615 Cr ( $75M ), The Lunar Mission Will Complete In 40 Days .`.split(
      ''
    );
  bodyText = '';

  showBodyTypewriter = false;
  showHeading: boolean = true;
  showBody: boolean = true;
  isComplete: boolean = false;
  hideBackground: boolean = false;
  subscriptions: any = [];
  timeouts: any = [];
  constructor(private _helperService: HelperService) {
    this.isMobile = this._helperService.isMobileCheck();
  }

  ngOnInit(): void {
    this.subscriptions.push(interval(100)
      .pipe(take(this.headingArray.length))
      .subscribe((text) => {
        this.headingText += this.headingArray[this.textCounter];
        this.textCounter++;
      }));
    this.subscriptions.push(timer(3000).subscribe((e) => {
      this.showHeadingTypewriter = false;
      this.switchToDescription();
    }));
    this.subscriptions.push(this._helperService.stateChange.subscribe(
      (result) => {
        this.changeText(result);
      },
      (err) => console.log,
      () => {
        this.isComplete = true;
        (document.getElementById('infoContainer') as any).style.background =
          'rgba(0,0,0,0.6)';
        (document.getElementById('textWrapper') as any).style.height = '80%';
        (document.getElementById('textWrapper') as any).style.minHeight = '80%';
        (document.getElementById('heading') as any).style.marginTop = '20%';
        (document.getElementById('heading') as any).style.paddingRight = '20%';
        (document.getElementById('textWrapper') as any).style.fontSize =
          '0.5em';
      }
    ));
  }

  switchToDescription() {
    this.textCounter = 0;
    this.subscriptions.push(interval(10)
      .pipe(take(this.bodyArray.length))
      .subscribe((count) => {
        // this.bodyText = this.bodyText.substring(0, this.bodyText.length - 1);
        this.bodyText += this.bodyArray[this.textCounter];
        this.textCounter++;
      }));

    this.subscriptions.push(
      timer(5000).subscribe((e) => {
        this.showHeading = false;
        (document.getElementById('bodyText') as any).style.height = '0%';
        (document.getElementById('textWrapper') as any).style.height = '32%';
        (document.getElementById('textWrapper') as any).style.minHeight = '20%';
        (document.getElementById('heading') as any).style.marginTop = '0%';
        (document.getElementById('textWrapper') as any).style.fontSize = this
          .isMobile
          ? '0.5em'
          : '0.240em';
        this.showBody = false;
        this.timeouts.push(setTimeout(() => {
          this._helperService.stateChange.next(
            'July 14: Chandrayaan III Launches from SrihariKota'
          );
        }, 6000));
        this.timeouts.push(setTimeout(() => {
          this._helperService.stateChange.next('');
          new Chandrayan(this._helperService);
          this.hideBackground = true;
          // interval(1000).subscribe(console.log);
        }, 2500));
      }));
  }

  changeText(str: string) {
    this.subscriptions.push(interval(1)
      .pipe(take(this.headingArray.length))
      .subscribe((e) => {
        this.headingText = this.headingText.substring(
          0,
          this.headingText.length - 1
        );
      }));
    this.headingArray = str.split('');
    this.textCounter = 0;
    this.timeouts.push(setTimeout(() => {
      this.subscriptions.push(interval(10)
        .pipe(take(this.headingArray.length))
        .subscribe((text) => {
          this.headingText += this.headingArray[this.textCounter];
          this.textCounter++;
        }));
    }, 500));
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((s: any) => s.unsubscribe());
    this.timeouts.forEach((t: any) => clearTimeout(t));
  }
}
