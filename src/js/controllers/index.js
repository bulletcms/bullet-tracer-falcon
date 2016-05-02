import {BulletmarkRender, BulletmarkCompile} from './bulletmark';
import {PagefetchActions, PagefetchReducers} from './pagefetch';
import {PagepostActions, PagepostReducers} from './pagepost';

const Services = {BulletmarkRender, BulletmarkCompile};
const Actions = {...PagefetchActions, ...PagepostActions};
const Reducers = {...PagefetchReducers, ...PagepostReducers};

export {Services, Actions, Reducers};
