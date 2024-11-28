import {
  Component,
  inject,
  input,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FireService } from '../../services/fire.service';
@Component({
  selector: 'app-view-favorite',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-favorite.component.html',
  styleUrl: './view-favorite.component.css',
})
export class ViewFavoriteComponent {
  fire = inject(FireService);

  id = input.required<string>();

  $state: WritableSignal<any> = signal({
    data: null,
    loading: true,
    error: null,
  });
  ngOnInit() {
    console.log('ID recibido:', this.id());
    this.fetchData();
  }
  fetchData() {
    this.$state.update((state) => {
      return { ...state, loading: true };
    });
    let request = this.fire.getRecipesById(this.id());
    request?.subscribe({
      next: (data: any) => {
        console.log('Data received:', data);
        this.$state.update((state) => {
          return { ...state, loading: false, data: data };
        });
      },
      error: (error: any) => {
        console.error(error);
        this.$state.update((state) => {
          return { ...state, loading: false, data: [], error: error };
        });
      },
    });
  }
}
