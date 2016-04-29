import 'whatwg-fetch';
import Immutable from 'immutable';


/* App state
------------------------------------------*/
const defaultState = Immutable.fromJS({
  currentPage: '',
  page: {
    path: '',
    title: '',
    tags: [],
    content: {}
  },
  opsQueue: []
});

/* State services
------------------------------------------*/
const pagelistHasPage = (state, page)=>{
  return state.get('pagelist').has(page);
};


/* Pages
------------------------------------------*/

// SYMBOLS

// editing
const SET_CURRENT_PAGE = Symbol('SET_CURRENT_PAGE');
const CLEAR_CURRENT_PAGE = Symbol('CLEAR_CURRENT_PAGE');
const RESET_PAGE_EDITS = Symbol('RESET_PAGE_EDITS');
const EDIT_PAGE = Symbol('EDIT_PAGE');
const NEW_PAGE = Symbol('NEW_PAGE');
const MODIFY_PAGE_PROPS = Symbol('MODIFY_PAGE_PROPS');


// posting
const POST_PAGE = Symbol('POST_PAGE');
const POSTING_PAGE = Symbol('POSTING_PAGE');
const DELETE_PAGE = Symbol('DELETE_PAGE');
const PUT_PAGE = Symbol('PUT_PAGE');
const SUCCESS_POST_PAGE = Symbol('SUCCESS_POST_PAGE');
const ERR_POST_PAGE = Symbol('ERR_POST_PAGE');


// ACTION CREATORS

const setCurrentPage = (pageId)=>{
  return {
    type: SET_CURRENT_PAGE,
    page: pageId
  };
};

const clearCurrentPage = ()=>{
  return {
    type: CLEAR_CURRENT_PAGE
  };
};

const resetPageEdits = ()=>{
  return {
    type: RESET_PAGE_EDITS
  };
};

const editPage = (pageId)=>{
  if(typeof pageId != 'string'){
    console.log('err edit page: pageId must be string, pageId: ', pageId);
    return;
  }

  return (dispatch, getState)=>{
    if(pagelistHasPage(getState().pagefetch, pageId)){
      dispatch(setCurrentPage(pageId));
      dispatch(resetPageEdits());
    }
    return Promise.resolve();
  };
};

const newPage = (pageId)=>{
  if(typeof pageId != 'string'){
    console.log('err edit page: pageId must be string, pageId: ', pageId);
    return;
  }
  return (dispatch, getState)=>{
    if(!pagelistHasPage(getState().pagefetch, pageId)){
      dispatch(setCurrentPage(pageId));
      dispatch(resetPageEdits());
    }
    return Promise.resolve();
  }
};

const modifyPageProps = (path, title, tags, content)=>{
  return {
    type: MODIFY_PAGE_PROPS,
    path,
    title,
    tags,
    content
  };
};


/* Reducer
------------------------------------------*/
const pagepost = (state=defaultState, action)=>{
  switch(action.type){
    default:
      return state;
  }
};
