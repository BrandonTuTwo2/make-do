import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule, HlmButtonDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {
  title = 'Make Do';
  curIngredientList: string[] = [];
  ingredientFormController = new FormControl('');
  curCockTailList: cocktail[] = [];
  addToCurIngredientsList = () => {
    const formVal = this.ingredientFormController.getRawValue();

    if (formVal && formVal?.length > 0) {
      this.curIngredientList.push(formVal);
      this.ingredientFormController.setValue('');
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
    if(this.curIngredientList === undefined || this.curIngredientList.length === 0){
      console.log("Add code to alert the user!!!");
    } else {
      const response = await fetch('/api/cocktailSearch',{
        method: "POST",
        body: JSON.stringify({ ingredientList: this.curIngredientList }),
      });

      const resCocktail = await response.json()
      this.curCockTailList = JSON.parse(resCocktail.body);
      console.log(this.curCockTailList);
    }
    }
}

export interface cocktail {
  ingredients: string[]
  instructions: string
  name: string
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
