import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HelperService } from './helper.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'portfolio-v2';
    public lightTheme: boolean = true;
    showSkillset: boolean = false;
    showChandrayan: boolean = false;
    constructor(private _helper: HelperService, private _router: Router) {

    }



    ngOnInit() {
        const mobile = window.navigator.userAgent;
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(mobile)) {
            this._helper.isMobile = true;
        }
        this._helper.isLightTheme.subscribe((isLight: boolean) => {
            if (isLight) {
                document.body.classList.add('light');
                document.body.classList.remove('dark');
            } else {
                document.body.classList.add('dark');
                document.body.classList.remove('light');

            }
        });
        this._helper.toChandrayan.subscribe((val: any) => {
            this.navigateToPage('chandrayan');
        })

        setTimeout(() => {
            this.showSkillset = true;
        }, 3000);

    }

    public navigateToPage(path: string) {
        if (path === 'chandrayan') {
            this.showChandrayan = true;
        } else {
            this.showChandrayan = false;
        }
        this._router.navigate([path], { skipLocationChange: true });


    }
}
