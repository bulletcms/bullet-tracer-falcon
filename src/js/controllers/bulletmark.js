const BulletmarkRender = (viewjson, views)=>{
  // view json : json component array; views : map of tag name to component jsx [ex: 'thecomponent': TheComponent];
  // {component : string, config : config props, children : json component array}
  let viewtree = [];
  let k=0;
  for(let i of viewjson){
    if(views[i.component]){
      const dynamiccomponent = views[i.component];
      let children = '';
      let config = {};
      if(i.children && i.children.length > 0){
        if(typeof i.children == 'string'){
          children = i.children;
        } else {
          children = BulletmarkRender(i.children, views);
        }
      }
      if(i.config){
        config = i.config;
      }
      viewtree.push(<dynamiccomponent key={k} config={config}>{children}</dynamiccomponent>);
    }
    k++;
  }

  return viewtree;
};

const headerparse = (text)=>{
  const split = text.indexOf(' ');
  const component = 'h' + split;
  const children = text.substring(split + 1);
  return {component, children};
}

const componentparse = (text)=>{
  const newtext = text.substring(1, text.length-1);
  const [component, configtext] = newtext.split('|').map((text)=>{return text.trim();});
  const configarray = configtext.split().map((text)=>{return text.split('=')});
  let config = {};
  for(let i of configarray){
    config[i[0]] = i[1];
  }

  return {component, config};
}

const paragraphparse = (text)=>{
  return {component: 'p', children: text};
}

const BulletmarkCompile = (bulletmark)=>{
  // bulletmark : markdown;
  let viewjson = [];

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

    {TheComponent | property=value another_property=another_value}
  */

  let components = bulletmark.split('\n');

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
          viewjson.push(paragraphparse(i));
      }
    }
  }

  return viewjson;
};

export {BulletmarkRender, BulletmarkCompile};
