

/* Local storage factory */

app.factory('storageService',function() {
  var _storageKeyName = 'gmail_destroyer';

    var _initStorage = function(word) {
      
      try {
        var storage = window.localStorage.getItem(_storageKeyName);
        if(storage) {
          var gmailDestroyerObj = JSON.parse(storage);
          console.info(gmailDestroyerObj);
          return ;
        } else {
          var gmailDestroyerObj = {
            keywords: [
              {
                  title:'Slack',
                  enabled: true,
                  totalMatched: 0   
              },
              {
                  title:'Lynda',
                  enabled: true,
                  totalMatched: 0   
              }
          ]
        };
          
          window.localStorage.setItem(_storageKeyName, JSON.stringify(gmailDestroyerObj));
          return;
          
          }// else
             
      throw new Error("Localstorage not supported in your browser");
        
      } catch(e) {
        console.error(e.message);
      }
    
    };
  _initStorage();
  
  var _getStorage = function () {
    return JSON.parse(window.localStorage.getItem(_storageKeyName));
  };
  
  
  var _addNewKeyword = function(keyword) {
    var storage = _getStorage();
    storage.keywords.unshift(keyword);
    try {
            window.localStorage.setItem(_storageKeyName,JSON.stringify(storage));
      return true;
    } catch(e) {
      return false;
    } 
    
  };
  
  
  var _deleteKeyword = function(index) {
        var storage = _getStorage();
        storage.keywords.splice(index,1);
        try {
             window.localStorage.setItem(_storageKeyName,JSON.stringify(storage));
            return true;
        } catch(e) {
            return false;
        } 
    
  };
  
    
  
  var _toggleKeywordStatus = function(index) {
        var storage = _getStorage();
        storage.keywords[index].enabled =!storage.keywords[index].enabled;
        try {
             window.localStorage.setItem(_storageKeyName,JSON.stringify(storage));
            return true;
        } catch(e) {
            return false;
        } 
    
  };
  
    
  var _getAllKeywords = function(index) {
        var storage = _getStorage();
         return storage.keywords;
  };
  
  return {
    addNewKeyword: _addNewKeyword,
    deleteKeyWord: _deleteKeyword,
    getAllKeywords: _getAllKeywords,
    changeKeywordStatus: _toggleKeywordStatus
  };
  
});