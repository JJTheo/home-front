import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { ShowcaseComponent } from "./components/showcase/showcase.component";
import { NumberFieldComponent } from "./components/number-field/number-field.component";
import { TextFieldComponent } from "./components/text-field/text-field.component";
import { TextField2Component } from './components/text-field2/text-field2.component';
import { NumberField2Component } from './components/number-field2/number-field2.component';
import { NgxMaskModule } from 'ngx-mask/lib/ngx-mask.module';
import { IConfig } from 'ngx-mask';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [AppComponent, ShowcaseComponent, NumberFieldComponent, TextFieldComponent, TextField2Component, NumberField2Component],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, AppRoutingModule, NgxMaskModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
