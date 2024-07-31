import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HlmButtonDirective } from '../../components/ui-button-helm/src';
import { HlmInputDirective } from '../../components/ui-input-helm/src';
import { toast } from 'ngx-sonner';
import { HlmToasterComponent } from '../../components/ui-sonner-helm/src';
import {
  HlmCaptionComponent,
  HlmTableComponent,
  HlmTdComponent,
  HlmThComponent,
  HlmTrowComponent,
} from '../../components/ui-table-helm/src';
import { BrnAccordionContentComponent } from '@spartan-ng/ui-accordion-brain';
import {
  HlmAccordionContentDirective,
  HlmAccordionDirective,
  HlmAccordionIconDirective,
  HlmAccordionItemDirective,
  HlmAccordionTriggerDirective,
} from '../../components/ui-accordion-helm/src';
import { HlmIconComponent } from '../../components/ui-icon-helm/src';
import { HlmSpinnerComponent } from '../../components/ui-spinner-helm/src';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    CommonModule,
    HlmButtonDirective,
    HlmInputDirective,
    HlmTableComponent,
    HlmTdComponent,
    HlmThComponent,
    HlmTrowComponent,
    HlmCaptionComponent,
    BrnAccordionContentComponent,
    HlmAccordionDirective,
    HlmAccordionItemDirective,
    HlmAccordionTriggerDirective,
    HlmAccordionContentDirective,
    HlmAccordionIconDirective,
    HlmIconComponent,
    HlmSpinnerComponent,
    HlmToasterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Make Do';
  curIngredientList: string[] = [];
  ingredientFormController = new FormControl('');
  curCockTailList: cocktail[] = [];
  @ViewChild('spinner')
  spinner!: ElementRef;

  addToCurIngredientsList = () => {
    const formVal = this.ingredientFormController.getRawValue();

    if (formVal && formVal?.length > 0) {
      this.curIngredientList.push(formVal);
      this.ingredientFormController.setValue('');
      console.log(this.curIngredientList);
    } else {
      toast("You didn't input an ingredient!");
    }

    if (checkCookie() !== null) {
      console.log(
        'create and save item to cookie or maybe make this into a separate function'
      );
    }
  };

  removeItem = (ingr: string) => {
    console.log('CLICKED');
    console.log(this.curIngredientList);
    const index = this.curIngredientList.indexOf(ingr);
    if (index > -1) {
      this.curIngredientList.splice(index, 1);
    }
    console.log(this.curIngredientList);
  };

  searchCocktail = async () => {
    if (
      this.curIngredientList === undefined ||
      this.curIngredientList.length === 0
    ) {
      toast("Ingredients list is empty");
    } else {
      this.spinner.nativeElement.style.setProperty("display","block");
      const response = await fetch('/api/cocktailSearch', {
        method: 'POST',
        body: JSON.stringify({ ingredientList: this.curIngredientList }),
      });

      const resCocktail = await response.json();
      this.spinner.nativeElement.style.setProperty("display","none");
      this.curCockTailList = JSON.parse(resCocktail.body);
      console.log(this.curCockTailList);
    }
  };
}

export interface cocktail {
  ingredients: string[];
  instructions: string;
  name: string;
}

const checkCookie = () => {
  return document.cookie.match(/^(.*;)?\s*ingredientList\s*=\s*[^;]+(.*)?$/);
};
