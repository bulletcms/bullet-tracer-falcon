const BulletmarkRender = (viewjson, views)=>{
  // view json : json component array; views : map of tag name to component jsx [ex: 'thecomponent': TheComponent];
  let viewtree = [];

  for(let i of viewjson){
    let k=0;
    if(views[i.component]){
      const dynamiccomponent = views[i.component];
      viewtree.push(<dynamiccomponent key={k} config={i.config}>{i.children}</dynamiccomponent>);
      k++;
    } else {
      viewtree.push('');
    }
  }

  return viewtree;
};

const BulletmarkCompile = (bulletmark)=>{
  // bulletmark : toml like markup with markdown support; views : set of supported components;
  let viewjson = {};

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

    > I am a quote.
    >
    > I am another paragraph in this quote.

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

  return viewjson;
};

export {BulletmarkRender, BulletmarkCompile};
