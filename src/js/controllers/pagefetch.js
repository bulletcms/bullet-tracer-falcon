import fetch from 'whatwg-fetch';
import Immutable from 'immutable';

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

const PageFetchActions = {fetchPage};

// update time is in sec
const defaultState = Immutable.fromJS({pages: {}, page: '', standardupdatetime: 512});

const UpdatePage = (state=defaultState, page, content, force=false)=>{
  let nextState = state;
  if(force || !(state.getIn(['pages', page])) || Math.floor(Date.now() / 1000) - state.getIn(['pages', page, 'updatetime']) > state.getIn(['standardupdatetime'])){
    nextState = state.setIn(['pages', page], Immutable.fromJS({content: Immutable.fromJS(content), fetching: false, updatetime: Math.floor(Date.now() / 1000)}));
  }
  return nextState.set('page', page);
};

const PageFetchReducer = (state=defaultState, action)=>{
  switch (action.type) {
    case RECEIVE_PAGE:
      return UpdatePage(state, action.url, action.page, action.content);
    case RECEIVE_PAGE_FAILED:
    case FETCH_PAGE:
    case FETCHING_PAGE:
    default:
      return state;
  }
};

export {PageFetchActions, PageFetchReducer};
