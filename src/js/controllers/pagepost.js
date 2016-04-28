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

/* Pages
------------------------------------------*/

// SYMBOLS

// editing
const SET_CURRENT_PAGE = Symbol('SET_CURRENT_PAGE');
const CLEAR_CURRENT_PAGE = Symbol('CLEAR_CURRENT_PAGE');
const EDIT_PAGE = Symbol('EDIT_PAGE');
const RESET_PAGE_EDITS = Symbol('RESET_PAGE_EDITS');
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

/* Reducer
------------------------------------------*/
const pagepost = (state=defaultState, action)=>{
  switch(action.type){
    default:
      return state;
  }
};
