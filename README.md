# Géobtenu

[![Netlify Status](https://api.netlify.com/api/v1/badges/e6879a2a-1fb0-4f52-a55e-b431b8627f23/deploy-status)](https://app.netlify.com/sites/geobtenu/deploys)

## Informations

Site web pour obtenir (d'où le jeu de mot dans le nom) rapidement des informations
sur un pays, pour GeoGuessr ou la géographie en général.

Le site est **entièrement statique**. Au moment du build, le résumé de la page
Wikipédia de chaque pays est récupéré et intégré directement dans la page (pré-rendu),
donc aucune requête n'est faite côté client.

Le contenu de chaque pays vient des fichiers markdown dans `content/countries/` —
c'est sur ces markdown que vous pouvez faire une pull request (voir par exemple
`content/countries/al.md`).

## Stack

- [Nuxt 4](https://nuxt.com) (Vue 3) en mode statique (`nuxt generate` + Nitro prerender)
- [Bun](https://bun.sh) comme runtime et gestionnaire de paquets
- [Tailwind CSS v4](https://tailwindcss.com) pour le style
- [Nuxt Content v3](https://content.nuxt.com) pour le markdown des pays
- [@nuxt/icon](https://github.com/nuxt/icon) (Material Design Icons) et [@nuxt/fonts](https://fonts.nuxt.com)
- [@nuxtjs/leaflet](https://github.com/nuxt-modules/leaflet) + [panzoom](https://github.com/anvaka/panzoom) pour les cartes

## Développement

```bash
# Installer les dépendances
bun install

# Serveur de développement (http://localhost:3000)
bun run dev

# Récupérer les résumés Wikipédia (écrit app/data/wikipedia.json)
bun run fetch:wikipedia

# Générer le site statique dans .output/public
#   (lance d'abord fetch:wikipedia, puis nuxt generate)
bun run generate

# Prévisualiser le build statique
bunx serve .output/public
```

## Déploiement (Netlify)

- Build command : `bun run generate`
- Publish directory : `.output/public`
