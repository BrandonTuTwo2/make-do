import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HlmButtonDirective } from '../../components/ui-button-helm/src';
import { HlmInputDirective } from '../../components/ui-input-helm/src';
import { toast } from 'ngx-sonner';
import { HlmToasterComponent } from '../../components/ui-sonner-helm/src';
import { BrnAccordionContentComponent } from '@spartan-ng/ui-accordion-brain';
import { HlmIconComponent } from '../../components/ui-icon-helm/src';
import { HlmSpinnerComponent } from '../../components/ui-spinner-helm/src';
import {
  HlmCaptionComponent,
  HlmTableComponent,
  HlmTdComponent,
  HlmThComponent,
  HlmTrowComponent,
} from '../../components/ui-table-helm/src';
import {
  HlmAccordionContentDirective,
  HlmAccordionDirective,
  HlmAccordionIconDirective,
  HlmAccordionItemDirective,
  HlmAccordionTriggerDirective,
} from '../../components/ui-accordion-helm/src';
import {
  BrnAlertDialogContentDirective,
  BrnAlertDialogTriggerDirective,
} from '@spartan-ng/ui-alertdialog-brain';
import {
  HlmAlertDialogActionButtonDirective,
  HlmAlertDialogCancelButtonDirective,
  HlmAlertDialogComponent,
  HlmAlertDialogContentComponent,
  HlmAlertDialogDescriptionDirective,
  HlmAlertDialogFooterComponent,
  HlmAlertDialogHeaderComponent,
  HlmAlertDialogOverlayDirective,
  HlmAlertDialogTitleDirective,
} from '../../components/ui-alertdialog-helm/src';

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
    HlmAlertDialogActionButtonDirective,
    HlmAlertDialogCancelButtonDirective,
    HlmAlertDialogComponent,
    HlmAlertDialogContentComponent,
    HlmAlertDialogDescriptionDirective,
    HlmAlertDialogFooterComponent,
    HlmAlertDialogHeaderComponent,
    HlmAlertDialogOverlayDirective,
    HlmAlertDialogTitleDirective,
    BrnAlertDialogContentDirective,
    BrnAlertDialogTriggerDirective,
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

  ngOnInit() {
    if (typeof document !== 'undefined') {
      if (this.checkCookie()) {
        const value = '; ' + document.cookie;
        const parts = value.split('; ingrList=');
        if (parts.length == 2) {
          const cookieValRaw = parts.pop();
          const cookieVal = cookieValRaw?.split(',') ?? [];
          this.curIngredientList = cookieVal;
        }
      }
    }
  }

  checkCookie = () => {
    return (
      document.cookie.match(/^(.*;)?\s*ingrList\s*=\s*[^;]+(.*)?$/) !== null
    );
  };

  addToCurIngredientsList = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const formVal = this.ingredientFormController.getRawValue();

    if (formVal && formVal?.length > 0) {
      this.curIngredientList.push(formVal);
      this.ingredientFormController.setValue('');
      if (typeof document !== 'undefined') {
        if (this.checkCookie()) {
          const value = '; ' + document.cookie;
          const parts = value.split('; ingrList=');
          if (parts.length == 2) {
            const cookieValRaw = parts.pop();
            const cookieVal = cookieValRaw?.split(',') ?? [];
            cookieVal.push(formVal);
            const saveCookieVal = cookieVal.toString();
            document.cookie = 'ingrList=' + saveCookieVal + ';';
          }
        } else {
          console.log('adding cookie');
          document.cookie = 'ingrList=' + formVal + ';';
        }
      }
    } else {
      toast("You didn't input an ingredient!");
    }
  };

  removeItem = (ingr: string) => {
    const index = this.curIngredientList.indexOf(ingr);
    if (index > -1) {
      this.curIngredientList.splice(index, 1);
      if (typeof document !== 'undefined') {
        if (this.checkCookie()) {
          const value = '; ' + document.cookie;
          const parts = value.split('; ingrList=');
          console.log(parts);
          if (parts.length == 2) {
            const cookieValRaw = parts.pop();
            const cookieVal = cookieValRaw?.split(',') ?? [];
            cookieVal.splice(index, 1);
            const saveCookieVal = cookieVal.toString();
            document.cookie = 'ingrList=' + saveCookieVal + ';';
          }
        }
      }
    }
  };

  searchCocktail = async () => {
    if (
      this.curIngredientList === undefined ||
      this.curIngredientList.length === 0
    ) {
      toast('Ingredients list is empty');
    } else {
      this.spinner.nativeElement.style.setProperty('display', 'block');
      const response = await fetch('/api/cocktailSearch', {
        method: 'POST',
        body: JSON.stringify({ ingredientList: this.curIngredientList }),
      });

      const resCocktail = await response.json();
      this.spinner.nativeElement.style.setProperty('display', 'none');
      this.curCockTailList = JSON.parse(resCocktail.body);
    }
  };
}

export interface cocktail {
  ingredients: string[];
  instructions: string;
  name: string;
}
