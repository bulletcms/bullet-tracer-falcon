import murmurhash3 from 'murmurhash3js';
import platform from 'platform';

const SEED = Math.floor(Date.now() / 1000);

const hashCode = (theString)=>{
  let arch = 'x86';
  if(platform.os.architecture == 64){
    arch = 'x64';
  }
  return murmurhash3[arch].hash128(theString, SEED);
};

const timeNow = ()=>{
  return Math.floor(Date.now() / 1000);
};

export {hashCode, timeNow};
