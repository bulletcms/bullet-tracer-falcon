const BulletmarkRender = (viewjson, views)=>{
  // view json : json component array; views : map of tag name to component jsx [ex: 'thecomponent': TheComponent];
  let viewtree = [];

  for(let i of viewjson){
    let k;
    if(views[i.component]){
      viewtree.push(views[i.component]);
    } else {
      viewtree.push('');
    }
  }

  return viewtree;
};

const BulletmarkCompile = (bulletmark, views)=>{
  // bulletmark : yaml,cson like markup with markdown support; views : set of supported components;
  let viewjson = {};

  return viewjson;
};

export {BulletmarkRender, BulletmarkCompile};
