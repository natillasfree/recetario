import {
  Component,
  inject,
  Input,
  signal,
  WritableSignal,
} from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { Recipe } from '../../model/recipe';
import { FireService } from '../../services/fire.service';
import { FormModalComponent } from '../../modal/form-modal/form-modal.component';

@Component({
  selector: 'app-list-recipes',
  standalone: true,
  imports: [NgClass, FormModalComponent],
  templateUrl: './list-recipes.component.html',
  styleUrls: ['./list-recipes.component.css'],
})
export class ListRecipesComponent {
  api = inject(ApiService);
  router = inject(Router);
  fire = inject(FireService);

  @Input()
  type: string = '';

  @Input()
  subtype: string = '';

  isModalOpen: boolean = false;

  $state: WritableSignal<any> = signal({
    loading: false,
    error: false,
    data: [],
  });

  ngOnInit() {
    // Al inicio del componente
    this.fetchData();
  }

  fetchData() {
    // Llamar al servicio
    this.$state.update((state) => ({ ...state, loading: true }));

    let request;
    console.log('Fetching data');
    // Cuando accedo a /recipes/favorites this.type = undefined
    switch (this.type) {
      case 'category':
        request = this.api.getRecipesByCategory(this.subtype);
        break;
      case 'nationality':
        request = this.api.getRecipesByNationality(this.subtype);
        break;
      case undefined:
        request = this.fire.getRecipesWithID(); // Cambiar al método que obtiene recetas con ID
        break;
      default:
        request = null;
    }

    if (request) {
      // Subscribo al observable
      (request as any).subscribe({
        next: (data: any) => {
          data.reduce((acc: any, item: any) => {
            const { id, ...recipeData } = item;
            acc[id] = recipeData;
            return acc;
          }, {});

          this.$state.update((state) => ({
            ...state,
            loading: false,
            error: false,
            data: data,
          }));
        },
        error: (err: any) => {
          this.$state.update((state) => ({
            ...state,
            loading: false,
            error: err,
            data: [],
          }));
        },
      });
    } else {
      // Error
      this.$state.update((state) => ({
        ...state,
        loading: false,
        error: 'Categoría incorrecta',
      }));
    }
  }

  // Método para navegar a los detalles de la receta
  goToRecipe(idMeal: string) {
    if (this.type === undefined) {
      this.router.navigate([`/recipe/favorites/${idMeal}`]);
    } else {
      this.router.navigate([`recipe/${idMeal}`]);
    }
  }

  openModal() {
    this.isModalOpen = true;
    history.pushState({}, document.title);
  }

  closeModal($event?: any) {
    if ($event) {
      // Podemos hacer algo...
      console.log('Desde el componente que abre el modal' + $event);
    }
    this.isModalOpen = false;
  }

  // Nuevo método para eliminar una receta de favoritos
  removeFromFavorites(recipeId: string) {
    if (!recipeId) return;

    // Llamar al servicio FireService para eliminar la receta
    this.fire
      .deleteRecipeById(recipeId)
      .then(() => {
        console.log(`Receta con ID ${recipeId} eliminada`);
        this.$state.update((state) => ({
          ...state,
          data: state.data.filter((recipe: any) => recipe.idMeal !== recipeId),
        }));
      })
      .catch((err) => {
        console.error('Error al eliminar la receta:', err);
      });
  }
  editRecipe(idMeal: string): void {
    this.router.navigate([`/favorites/edit/${idMeal}`]);
  }
}
