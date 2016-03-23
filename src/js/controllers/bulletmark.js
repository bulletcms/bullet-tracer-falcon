const Bulletmark = (viewjson, views)=>{
  // view json : json component array; views : map of tag name to component jsx [ex: 'thecomponent': TheComponent]
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

export {Bulletmark};
