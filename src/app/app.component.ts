import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'make-do';
}

console.log("HI where is this");
const testHi = async() => {
  const res = await fetch('/api/hello');
  console.log(res)
  const resTest = await res.json();
  console.log(resTest);
}

testHi();