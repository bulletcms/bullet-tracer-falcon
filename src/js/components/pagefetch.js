import fetch from 'whatwg-fetch';

const FETCH_PAGE = Symbol('FETCH_PAGE');
const FETCHING_PAGE = Symbol('FETCHING_PAGE');
const RECEIVE_PAGE = Symbol('RECEIVE_PAGE');
const RECEIVE_PAGE_FAILED = Symbol('RECEIVE_PAGE_FAILED');

const fetchingPage = (url)=>{
  return {
    type: FETCHING_PAGE,
    page: url
  };
};

const receivePage = (url, json)=>{
  return {
    type: RECEIVE_PAGE,
    page: url,
    content: json
  };
};

const receivePageFailed = (url, err)=>{
  return {
    type: RECEIVE_PAGE_FAILED,
    page: url,
    error: err
  };
}

const fetchPage = (base, url)=>{
  return (dispatch)=>{
    dispatch(fetchingPage(url));

    fetch(base+url)
      .then((res)=>{
        return res.json();
      })
      .then((json)=>{
        dispatch(receivePage(url, json))
      }).catch((err)=>{
        dispatch(receivePageFailed(url, err));
      });
  };
};

const PageFetchActions = {fetchPage, fetchingPage, receivePage, receivePageFailed};

const PageFetchReducer = (state={
  pages: {}
}, action)=>{
  switch (action.type) {
    case FETCH_PAGE:
      return state;
    case FETCHING_PAGE:
      return state;
    case RECEIVE_PAGE:
      return state;
    case RECEIVE_PAGE_FAILED:
      return state;
    default:
      return state;
  }
};

export {PageFetchActions, PageFetchReducer};
