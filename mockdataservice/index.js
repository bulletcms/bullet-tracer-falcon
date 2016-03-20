import express from 'express';

const MOCKAPI = {
  page: {
    about: {
      content: [
        {
          component: 'h1',
          content: 'About Bullet CMS'
        },
        {
          component: 'h2',
          content: 'a project of xorkevin'
        },
        {
          component: 'p',
          content: 'Hello world!'
        }
      ]
    }
  }
};

let mockdataservice = express();

const timelogger = (req, res, next)=>{
  console.log(Date.now());
  next();
};

mockdataservice.use(timelogger);

mockdataservice.get('/api/page/:page', (req, res)=>{
  const page = req.params.page;
  res.json(MOCKAPI.page[page]);
});

mockdataservice.get('/ping', (req, res)=>{
  res.send('pinged');
});

const start = ()=>{
  return mockdataservice.listen(3000, ()=>{
    console.log('mock api listening on localhost:3000');
  });
};

export default start
