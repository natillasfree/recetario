export const environment = {
    production: false,
    firebaseConfig: {
        apiKey: "AIzaSyC9P6E1ADoENOqmKKgnbSaIGLUKxqrW1jE",
        authDomain: "recetario-41d5f.firebaseapp.com",
        projectId: "recetario-41d5f",
        storageBucket: "recetario-41d5f.firebasestorage.app",
        messagingSenderId: "314948767107",
        appId: "1:314948767107:web:6540ad21147edfa4d57ab6",
        measurementId: "G-7EMF39K5L8"
      },
    api:{
        nationalities:'https://www.themealdb.com/api/json/v1/1/list.php?a=list',
        categories:'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
        listByCategory: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=',
        listByNationality: 'https://www.themealdb.com/api/json/v1/1/filter.php?a=',
        viewRecipe:'https://www.themealdb.com/api/json/v1/1/lookup.php?i='
    }
    
};
