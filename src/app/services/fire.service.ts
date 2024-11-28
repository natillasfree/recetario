import { inject, Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Recipe } from '../model/recipe';

@Injectable({
  providedIn: 'root',
})
export class FireService {
  firestore = inject(AngularFirestore);
  itemCollection!: AngularFirestoreCollection<any>;
  items$!: Observable<any[]>;
  auth = inject(AuthService);

  constructor() {
    const path = `users/${this.auth.userData.uid}/recipes`;
    console.log('Ruta de la colección:', path);
    this.itemCollection = this.firestore.collection(path);
    this.items$ = this.itemCollection.valueChanges({ idField: 'id' });
  }

  createRecipe(recipe: Recipe): Promise<DocumentReference<Recipe>> {
    return this.itemCollection.add(recipe);
  }

  deleteRecipeById(id: string): Promise<void> {
    return this.itemCollection.doc(id).delete();
  }

  getRecipeById(id: string): Observable<Recipe> {
    return this.itemCollection
      .doc<Recipe>(id)
      .valueChanges()
      .pipe(
        map((recipe) => {
          if (recipe) {
            return { idMeal: id, ...recipe };
          }
          throw new Error('Recipe not found');
        })
      );
  }

  getRecipes(): Observable<Recipe[]> {
    return this.items$;
  }

  getRecipesWithID(): Observable<Recipe[]> {
    return this.itemCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Recipe;
          const idMeal = a.payload.doc.id;
          return { idMeal, ...data };
        })
      )
    );
  }
  updateRecipe(id: string, recipe: Recipe): Promise<void> {
    return this.itemCollection.doc(id).update(recipe);
  }
  getRecipesById(id: string): Observable<Recipe> {
    return this.itemCollection.doc(id).valueChanges();
  }
}
