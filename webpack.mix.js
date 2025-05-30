let mix = require('laravel-mix')
let webpack = require('webpack')

mix.setPublicPath('./dist')

mix.js('src/app.js', 'dist/js').vue()

mix.js('src/background_tasks/process_job_description.js', 'dist/js/background_tasks').vue()

mix.js('src/content_pages/interactWithAJob.js', 'dist/js/content_pages').vue()
mix.js('src/content_pages/parseBestMatch.js', 'dist/js/content_pages').vue()

mix.postCss('src/assets/main.css', 'dist/css', [require('tailwindcss')])

mix.webpackConfig((webpack) => {
  return {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_DEVTOOLS__: false,
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
      })
    ]
  }
})
