import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

require("dotenv").config();


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'make-do';
  envTest = process.env["TEST"] || 'not working :(';

}
