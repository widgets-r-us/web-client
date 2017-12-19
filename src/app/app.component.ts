import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div style="text-align:center">
    <h1>
      Welcome to {{title}}!
    </h1>
    <img width="200" alt="Widgets R Us logo" src="../assets/widgets-r-us-logo.svg">
  </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Widgets-R-Us';
}
