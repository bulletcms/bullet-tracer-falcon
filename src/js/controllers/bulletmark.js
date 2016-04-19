import React from 'react';


/* React DOM list
------------------------------------------*/
const DOM = new Set([
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p'
]);


/* Bulletmark JSON Renderer
------------------------------------------*/
const BulletmarkRender = (viewjson, views={})=>{
  // view json : json component array; views : map of tag name to component jsx [ex: 'TheComponent': TheComponent];

  // end recursion
  if(typeof viewjson == 'string'){
    return viewjson;
  }

  let j = viewjson;

  if(!Array.isArray(viewjson)){
    j = [viewjson];
  }

  // viewjson is bulletmark JSON
  let viewtree = [];

  let k=0; // for keys in react
  for(let i of j){
    let isValid = false;
    let componentname = null;
    if(DOM.has(i.component)){
      isValid = true;
      componentname = i.component;
    } else if(views[i.component]){
      isValid = true;
      componentname = views[i.component];
    }

    if(isValid){
      let componentprops = {
        key: k
      };
      let componentchildren = null;
      if(i.props){
        Object.assign(componentprops, i.props);
      }
      if(i.children){
        componentchildren = i.children;
      }

      viewtree.push(React.createElement(componentname, componentprops, BulletmarkRender(componentchildren, views)));
      k++;
    }
  }

  if(viewtree.length < 2){
    return viewtree[0];
  }

  return viewtree;
};


/* Bulletmark JSON Spec
------------------------------------------*/
/*
  [
    {
      component: 'component_name_string',
      props: {
        prop1: val_of_prop1,
        prop2: val_of_prop2,
        ...
      },
      children: [
        bulletmark json array
      ]
    }
  ]
*/


/* Bulletmark Parsers
------------------------------------------*/
const headerparse = (text)=>{
  const split = text.trim().indexOf(' ');
  const component = 'h' + split;
  const children = text.substring(split + 1);
  return {component, children};
};

const componentparse = (text)=>{
  const [first, second, ...third] = text.trim().substring(1, text.length-1).split('|');
  const [component, configtext, childrentext] = [first, second, third.join('|')].map((text)=>{return text.trim();});

  // parse config
  let hasConfig = false;
  let config = {};
  if(configtext && configtext.length > 0){
    hasConfig = true;
    for(let i of configtext.split().map((text)=>{return text.split('=')})){
      config[i[0]] = i[1];
    }
  };

  // parse childrentext
  let hasChildren = false;
  let children = [];
  if(childrentext){
    hasChildren = true;
    children = BulletmarkCompile(childrentext);
  }

  // assemble json
  let componentjson = {component};
  if(hasConfig){
    componentjson.config = config;
  }
  if(hasChildren){
    componentjson.children = children;
  }
  return componentjson;
};

const paragraphparse = (text)=>{
  return {component: 'p', children: text.trim()};
};


/* Bulletmark Compiler
------------------------------------------*/
const BulletmarkCompile = (bulletmark, paradefault=true)=>{
  // bulletmark : markdown;
  let viewjson = [];

  let components = bulletmark.split('___').map((text)=>{return text.trim();});

  for(let i of components){
    if(i.length > 0){
      const firstchar = i.charAt(0);
      switch(firstchar) {
        case '#':
          viewjson.push(headerparse(i));
          break;
        case '{': //}
          viewjson.push(componentparse(i));
          break;
        default:
          if(paradefault){
            viewjson.push(paragraphparse(i));
          }
      }
    }
  }

  // return single element if only one element
  if(viewjson.length < 2){
    // return plain text if toggled
    if(!paradefault && viewjson[0].component == 'p'){
      return viewjson[0].children;
    }
    return viewjson[0];
  }

  return viewjson;
};


/* Bulletmark Spec
------------------------------------------*/
/*
  # heading 1
  ## heading 2
  ### heading 3
  #### heading 4
  ##### heading 5
  ###### heading 6

  *emphasized text*
  **bolded text**

  subscript
  H_2 O
  superscript
  x^2 + 1

  i am a paragraph.

  i am also a paragraph.

  i am also the start of the third paragraph.
  i am not a fourth paragraph but instead the second sentence of the third.

  **quotes not implemented for now**
  > I am a quote.
  >
  > I am another paragraph in this quote.

  **not implemented**
  - this
  - is
  - a
  - list

  + this
  + is
  + an
  + ordered
  + list

  ```
  i am some block code
  ```

  this is some `inline code`

  [link](www.site.com)

  [link](/relative/link)

  !(www.site.com/image.jpg)

  !(/relative/image.jpg)

  {TheComponent | property=value another_property=another_value | children}
*/

export {BulletmarkRender, BulletmarkCompile};
