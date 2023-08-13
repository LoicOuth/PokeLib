# PokeLib-Frontend

## Architecture

### components folder

This folder contain all components of the application. If a component is used in multiple screens inside the application so put it in the general folder.
If a component is only used in one screen so you can create a folder for the screen in the root of the folder components and you can put the component inside this folder

Example icon component :

```
📂 src
   |-> 📂 components
         |-> 📂 Icons
               |-> 📄 TestIcon.vue
```

### core folder

This folder contain all models, interfaces, constants for all application.

- A model go in a subfolder models and is name is "\*\*\*.model.ts"
- A type go in a subfolder types and is name is "\*\*\*.type.ts" (Use type not interface)
- A constant go in a subfolder constants and is name is "\*\*\*.constant.ts"

### composable folder

This folder contain all composables for the application. You can seperate them in different folder.
Composables is a piece of reusable code that you can use in every application.

### router

This folder contain all navigation logic. It's always have a index.ts that is the enter point of the router and he choose where user need to be redirected.

### plugins

This folder contain all plugins for the application. One file was create for each plugin with the name of plugin. All this plugins are import in main.ts.

Example for vuetify plugins :

```
📂 src
   |-> 📂 plugins
            |-> 📄 vuetify.ts
```

### views folder

This folder contain all views of the application. If a feature have multiple views create a folder for this. A views is a routed component, you need to specifies views at the end.

Example for home view :

```
📂 src
   |-> 📂 views
            |-> 📄 HomeView.vue
```

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
