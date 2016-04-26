import 'whatwg-fetch';
import Immutable from 'immutable';


/* App state
------------------------------------------*/
const defaultState = Immutable.fromJS({
  fetchingPagelist: false,
  pagelist: Immutable.Set.of('indexroute'),
  pagelistUpdatetime: 0,
  pages: Immutable.Map({}),
  queue: Immutable.List([])
});


/* Pages
------------------------------------------*/

// SYMBOLS

// Queue
const QUEUE_PAGE = Symbol('QUEUE_PAGE');
const READ_QUEUE_PAGE = Symbol('READ_QUEUE_PAGE');

// Ops
const FETCH_PAGE = Symbol('FETCH_PAGE');
const FETCHING_PAGE = Symbol('FETCHING_PAGE');
const RECEIVE_PAGE = Symbol('RECEIVE_PAGE');
const ERR_PAGE = Symbol('ERR_PAGE');
