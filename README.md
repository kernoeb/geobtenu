# Géobtenu

[![Netlify Status](https://api.netlify.com/api/v1/badges/e6879a2a-1fb0-4f52-a55e-b431b8627f23/deploy-status)](https://app.netlify.com/sites/geobtenu/deploys)

## Informations

Site web réalisé en [Nuxt.js](https://nuxtjs.org/) pour obtenir (d'où le jeu de mot dans le nom) rapidement des informations sur un pays, pour GeoGuessr ou la géographie en général.

Le site final est statique, mais au moment du build, le summary de la page Wikipédia est fetch et ajouté dans la page du pays.

J'utilise [Nuxt Content](https://content.nuxtjs.org/fr/) pour afficher le contenu des markdown (c'est d'ailleurs sur ces markdown que vous pouvez réaliser une pull request : regardez par exemple le fichier `content/countries/al.md`)


## Build

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
