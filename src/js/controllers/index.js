import {BulletmarkRender, BulletmarkCompile} from './bulletmark';
import {PagefetchActions, PagefetchReducers} from './pagefetch';

const Services = {BulletmarkRender, BulletmarkCompile};
const Actions = {...PagefetchActions};
const Reducers = {...PagefetchReducers};

export {Services, Actions, Reducers};
