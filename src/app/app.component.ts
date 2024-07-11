import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Make Do';
  curIngredientList: string[] = [];
  ingredientFormController = new FormControl('');

  addToCurIngredientsList = () => {
    const formVal = this.ingredientFormController.getRawValue();

    if (formVal && formVal?.length > 0) {
      this.curIngredientList.push(formVal);
      console.log(this.curIngredientList);
    }

    if (checkCookie() === null) {
      console.log('does not exists');
    } else {
      console.log(
        'create and save item to cookie or maybe make this into a separate function'
      );
    }
  };

  searchCocktail = async() =>  {
    console.log('placeholder');

    const response = await fetch('/api/cocktailSearch',{
      method: "POST",
      body: JSON.stringify({ ingredientList: this.curIngredientList }),
    });

    console.log(response);
  };
}

const testHi = async () => {
  const res = await fetch('/api/hello');
  console.log(res);
  const resTest = await res.json();
  console.log(resTest);
};

const checkCookie = () => {
  return document.cookie.match(/^(.*;)?\s*ingredientList\s*=\s*[^;]+(.*)?$/);
};
//testHi();
