import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { ShowcaseComponent } from "./components/showcase/showcase.component";
import { NumberFieldComponent } from "./components/number-field/number-field.component";
import { TextFieldComponent } from "./components/text-field/text-field.component";

@NgModule({
  declarations: [AppComponent, ShowcaseComponent, NumberFieldComponent, TextFieldComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
