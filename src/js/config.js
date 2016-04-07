export default {
  nav: {
    links: [
      {name: 'home', path: '/'},
      {name: 'about', path: '/about'},
      {name: 'blog', path: '/blog'},
      {name: 'dash', path: '/dash'}
    ]
  },
  creator: {
      names: ['xorkevin'],
      copyright: 2015
  },
  pages: {
    base: {
      filename: 'localhost:3000/api/page/'
    },
    home: {
      path: 'home',
      format: 'bulletjson',
      filename: 'home'
    },
    about: {
      path: 'about',
      format: 'bulletjson',
      filename: 'about'
    }
  },
  dash: {
    path: 'dash'
  }
};
