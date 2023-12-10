import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { TechnologiesComponent } from './technologies/technologies.component';
import { ContactComponent } from './contact/contact.component';
import { SkillSetComponent } from './skill-set/skill-set.component';
import { LaptopMapComponent } from './skill-set/laptop-map/laptop-map.component';
import { DisplacementSphereComponent } from './about/displacement-sphere/displacement-sphere.component';
import { TypewriterComponent } from './about/typewriter/typewriter.component';
import { BrainComponentComponent } from './about/brain-component/brain-component.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    TechnologiesComponent,
    ContactComponent,

    SkillSetComponent,
    LaptopMapComponent,
    DisplacementSphereComponent,
    TypewriterComponent,
    BrainComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
