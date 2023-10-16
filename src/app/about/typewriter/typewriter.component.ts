import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-typewriter',
  templateUrl: './typewriter.component.html',
  styleUrls: ['./typewriter.component.scss'],
})
export class TypewriterComponent implements OnInit {
  constructor() {}
  @Input() fontSize: string = '1em';

  ngOnInit(): void {}
}
