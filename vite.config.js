import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [
    laravel({
      input: [
        'resources/scss/site.scss',
        'resources/javascript/site.js',
      ],
      refresh: [
        './resources/views/*.antlers.html',
        './resources/views/**/*.antlers.html',
        './resources/views/**/**/*.antlers.html',
      ]
    }
    ),
  ],
});