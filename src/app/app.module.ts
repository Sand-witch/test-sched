import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';

import { DevExtremeModule } from 'devextreme-angular';
import { Service } from './app.service';

@NgModule({
    imports: [
        BrowserModule,
        DevExtremeModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    providers: [Service]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);