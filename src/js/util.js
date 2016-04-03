const hashCode = (theString)=>{
  if(theString.length < 1){
    return 0;
  }

  let hash = 0;
  for (let i = 0; i < theString.length; i++){
    hash = ((hash << 5) - hash) + theString.charCodeAt(i);
    hash = hash & hash;
  }
  return hash;
};

export {hashCode};
