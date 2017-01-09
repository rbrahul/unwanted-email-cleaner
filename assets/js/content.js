function selectEmails(keywords) {
    var newKeyWordsWithCount = keywords;
    if( document.getElementsByClassName("F").length) {
 document.getElementsByClassName("F")[0].querySelectorAll("tbody>tr").forEach(function(node){
      var columns = node.querySelectorAll("td");
      var subject= columns[3].querySelector("span").textContent;
       var description= columns[5].querySelectorAll("span")[0].textContent;
       //TODO: NEED TO calculate more perfect count regarding titles because on title may have multiple common keywords 
        newKeyWordsWithCount.forEach(function(keyWord,index) {
          if((subject.indexOf(keyWord.title)> -1 || description.indexOf(keyWord.title) > -1) && keyWord.enabled === true ){
           newKeyWordsWithCount[index].totalMatched = newKeyWordsWithCount[index].totalMatched +1 ;
           columns[1].querySelector(".oZ-jc").click();
            }
         });

    });

    } else {
        console.error("Not Gmail Page");
    }
    return newKeyWordsWithCount;
}


function deleteMails() {
    var deleteBtn ;
    if(window.location.href.indexOf("#spam") > -1) {
           deleteBtn = document.querySelector(".aFi");
    }else {
          deleteBtn = document.querySelector(".T-I-Js-Gs");
    }
      
        var down = new MouseEvent('mousedown');
        var up = new MouseEvent('mouseup');
              deleteBtn.dispatchEvent(down);
              deleteBtn.dispatchEvent(up);
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    

    switch(request.command) {
        case "selectMail":
                var newkeywords = selectEmails(request.keywords);
                sendResponse({result: "selection_success",keywordItems:newkeywords});
                break;
        case "deleteMails":
                    deleteMails();
                      sendResponse({result:'deleted'});
                    break;       
    }
});


