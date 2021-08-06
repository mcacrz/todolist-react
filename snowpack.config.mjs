/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  env:{
    KEY_APP:'@todoList-react-app'
  },
  mount: {
    //directory name: 'build directory'
    public: '/',
    src: '/dist'
  },
  plugins: [
    '@snowpack/plugin-postcss'
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    tailwindConfig:'./tailwind.config.js'
  },
  buildOptions: {
    /* ... */
  }
};
