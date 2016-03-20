import fetch from 'whatwg-fetch';

const FETCH_PAGE_ACTION = Symbol("FETCH_ACTION");

const fetchAction = (url)=>{
  return {
    type: FETCH_PAGE_ACTION,
    
  }
};
