import{c as a}from"./chunk-CHYS4EZ7.js";import{A as s}from"./chunk-EIRGDIWM.js";import{U as n,_ as c,r}from"./chunk-UIUK56GT.js";import{a as o}from"./chunk-2F6QYXKT.js";var l=class i{firestore=c(a);itemCollection;items$;auth=c(s);constructor(){let e=`users/${this.auth.userData.uid}/recipes`;console.log("Ruta de la colecci\xF3n:",e),this.itemCollection=this.firestore.collection(e),this.items$=this.itemCollection.valueChanges({idField:"id"})}createRecipe(e){return this.itemCollection.add(e)}deleteRecipeById(e){return this.itemCollection.doc(e).delete()}getRecipeById(e){return this.itemCollection.doc(e).valueChanges().pipe(r(t=>{if(t)return o({idMeal:e},t);throw new Error("Recipe not found")}))}getRecipes(){return this.items$}getRecipesWithID(){return this.itemCollection.snapshotChanges().pipe(r(e=>e.map(t=>{let p=t.payload.doc.data(),d=t.payload.doc.id;return o({idMeal:d},p)})))}updateRecipe(e,t){return this.itemCollection.doc(e).update(t)}getRecipesById(e){return this.itemCollection.doc(e).valueChanges()}static \u0275fac=function(t){return new(t||i)};static \u0275prov=n({token:i,factory:i.\u0275fac,providedIn:"root"})};export{l as a};