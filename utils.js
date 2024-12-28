const getDataFromParam = (req, paramKey, returnType='string')=>{
    if(returnType==='float'){
      return parseFloat(req.query[paramKey])
    }
    if(returnType==='int'){
        return parseInt(req.query[paramKey])
      }
    return req.query[paramKey]
  } 
  
  module.exports = {
    getDataFromParam
  }