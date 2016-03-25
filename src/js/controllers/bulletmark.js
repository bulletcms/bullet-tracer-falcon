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
  // bulletmark : toml like markup with markdown support; views : set of supported components;
  let viewjson = {};

  /*
    [TheComponent]
      [props]
      prop1 = val1
      prop2 = val2
      prop3 = val3
      ---
      (children)
      jsxitem1
      jsxitem2
      jsxitem3
      ---
    ---

    h
    #
    ##
    ###
    ####
    #####
    ######

    strong
    **
    emphasis
    __





  */

  let components; // = bulletmark.splitbycharacter()

  return viewjson;
};

export {BulletmarkRender, BulletmarkCompile};
