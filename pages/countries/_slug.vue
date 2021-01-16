<template>
  <article>
    <h1>{{ article.title }}</h1>
    <nuxt-content :document="article" />
  </article>
</template>

<script>
export default {
  async asyncData ({ $content, params }) {
    const article = await $content('countries', params.slug).fetch()

    return { article }
  }
}
</script>
