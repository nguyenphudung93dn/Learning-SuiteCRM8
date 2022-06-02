import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ExtensionModule} from '../extension/extension.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        ExtensionModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}