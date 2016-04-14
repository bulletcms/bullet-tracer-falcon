import {BulletmarkRender, BulletmarkCompile} from './bulletmark';
import pagefetch from './pagefetch';

const Services = {BulletmarkRender, BulletmarkCompile};
const Actions = {...(pagefetch.Actions)};
const Reducers = {...(pagefetch.Reducers)};

export {Services, Actions, Reducers};
