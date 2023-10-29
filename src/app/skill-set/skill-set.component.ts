import { Component, OnInit, ViewChild } from '@angular/core';
import { interval } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-skill-set',
  templateUrl: './skill-set.component.html',
  styleUrls: ['./skill-set.component.scss']
})
export class SkillSetComponent implements OnInit {
  @ViewChild('container1') containerElem: any;

  skillsets = [
    {
      config: {
        imgUrl: 'assets/projects/chandrayaan.png',
        repeat: {
          x: 1, y: 1.3
        }
        , inverse: 1
      },
      title: 'Chandrayaan',
      description: "Animated Visualisation of Chandrayaan's 40 day journey to the moon. Developed using Three.js & GSAP ",
      techUsed: ['angular', 'javascript', 'rxjs', 'd3', 'css3'],
    },
    {
      config: {
        imgUrl: 'assets/projects/covid-tally.gif',
        repeat: {
          x: 1, y: 1.3
        }
        , inverse: 1
      },
      title: 'India Covid State-wise Viz',
      description: 'Animated Visualisation of state-wise tally for active covid-19 cases in India. Shows the steep rise of cases in Maharashtra at the beginning of second wave.',
      techUsed: ['angular', 'javascript', 'rxjs', 'd3', 'css3'],
    },
    {
      config: {

        imgUrl: 'assets/projects/vaccination-chart.png',
        repeat: {
          x: 1, y: 1.3
        }
        , inverse: 1
      },
      title: 'Total Vaccination in India Viz',
      description: 'Visualisation of total no. of vaccine doses administered in a given week through use of smooth line-curve.',
      techUsed: ['angular', 'javascript', 'rxjs', 'd3', 'css3'],
    },
    {
      config: {

        imgUrl: 'assets/projects/oil-price.gif',
        repeat: {
          x: 1, y: 1.3
        }
        , inverse: 1
      },
      title: 'Crude Oil Price in India Viz',
      description: 'Animated Visualisation of price for Crude oil that India imported during the period 2003-2020.',
      techUsed: ['angular', 'javascript', 'rxjs', 'd3', 'css3'],
    },
    {
      config: {

        imgUrl: 'assets/projects/portfolio.png',
        repeat: {
          x: 1, y: 1.3
        }
        , inverse: 1
      },
      title: 'Portfolio ',
      description: 'A simple yet elegant project for showcasing my ideas, interests & work experience',
      techUsed: ['angular', 'javascript', 'rxjs', 'd3', 'css3'],
    },
    {
      config: {

        imgUrl: 'assets/projects/maps.jpg',
        repeat: {
          x: 1, y: 1.3
        }
        , inverse: 1
      },
      title: 'MP-2018 Election Results',
      description: 'The map shows color-coded ACs based on the winner party in 2018 Assembly elections, with a dashboard for historic data of multiple cities.',
      techUsed: ['angular', 'javascript', 'rxjs', 'd3', 'css3'],
    },
    {
      config: {

        imgUrl: 'assets/projects/smiip.jpg',
        repeat: {
          x: 1, y: 1.3
        }
        , inverse: 1
      },
      title: 'SMIIP for politics.in',
      description: 'Developed a crawler for the firm @Politics.in. It parsed data from twitter/fb APIs for top politicians of India & updates the dashboard in realtime.',
      techUsed: ['dotnet_core'],
    }
  ];
  contactVias: any = [];
  contactsList: { name: string; url: string; isDarkLogo?: boolean }[] = [];
  isLight: boolean = false;

  constructor(private _helper: HelperService) { }

  ngOnInit(): void {
    this._helper.isLightTheme.subscribe((isLight: boolean) => {
      this.isLight = isLight;
    });
    this.contactsList = [
      {
        name: 'gmail',
        url: 'mailto:devanshu9719@gmail.com'
      },
      {
        name: 'linkedin',
        url: 'https://linkedin.com/in/devanshhu'
      },
      {
        name: 'github',
        isDarkLogo: true,
        url: 'https://github.com/devanshhu'
      },
      {
        name: 'instagram',
        url: 'https://instagram.com/devanshhu'
      }
    ];
    this.populateContactMe();
  }

  private populateContactMe() {
    let i = 0;
    interval(this._helper.isMobile ? 0 : 800).pipe(
      take(4),
      tap((i) => this.contactVias[i] = this.contactsList[i++])
    ).subscribe(
      x => console.log(x),
      err => console.log(err),
    );
  }

}
