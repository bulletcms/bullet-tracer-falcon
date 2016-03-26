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
    *text*
    emphasis
    **text**

    subscript
    H_2 O
    superscript
    x^2 + 1

    i am a paragraph.

    i am also a paragraph.

    i am also the start of the third paragraph.
    i am not a fourth paragraph but instead the second sentence of the third.

    '''
    i am some code
    '''
  */

  let components = bulletmark.split('\n');

  return viewjson;
};

export {BulletmarkRender, BulletmarkCompile};
