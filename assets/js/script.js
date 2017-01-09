chrome.tabs.getSelected(null, function(tab) {
          window.tabUrl = tab.url;
        });

var app = angular.module("emailDestoryer",[]);

 app.controller("EmailDestroyerCtlr",['$scope','$timeout','storageService',function ($scope,$timeout,storageService){

 $scope.gmailTab = false;
 $scope.deleting = false;
 $scope.totalMails = 0;
  $scope.keywords =[
    {
    title:'Slack',
    enabled: true,
    totalMatched: 0   
  }
  ];
    $scope.keywords = storageService.getAllKeywords();
   
   $scope.newKeyWord = {
     title: '',
    enabled: true,
    totalMatched: 0   
   };

   $scope.submitForm = function(event) {
       if(event.keyCode === 13) {  
         $scope.keywords.unshift($scope.newKeyWord);
         var keywordAdded = storageService.addNewKeyword($scope.newKeyWord);
         if(keywordAdded) {
           console.info('key word added');
         } else {
            console.error('something went wrong while adding keyword');
         }
         $scope._resetForm();
     }
   };

   $scope._resetForm= function(){
     $scope.newKeyWord = '';
   };
   
   $scope.deleteKeyword = function(index) {
     //e.preventDefault();
     var confirmed = confirm("Do you really want to delete this keyword?");
     if(confirmed) {
       $scope.keywords.splice([index],1);
       var keywordDeleted = storageService.deleteKeyWord(index);
         if(keywordDeleted) {
           console.info('key word deleted successfully');
         } else {
            console.error('something went wrong while deleting keyword');
         }
     }
   };
   
    
   $scope.changeStatusKeyword = function(index) {
       $scope.keywords[index].enabled =!$scope.keywords[index].enabled;
   var keywordStatusChanged = storageService.changeKeywordStatus(index);
         if(keywordStatusChanged) {
           console.info('keyword status changed successfully');
         } else {
            console.error('something went wrong while changing status of keyword');
         }
   
   };
   
   $scope.mailFound = function(){
     var mails = $scope.keywords.map(function(word) {
       return word.totalMatched;
     });
     $scope.totalMails = mails.reduce(function(first,second) {
       return first+second;
     });
     console.info("Total mail"+$scope.totalMails);
   }
    
   
$scope.selectEmails = function(tab) 
        {
          console.info("Initiated");
         
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {command: "selectMail",keywords:storageService.getAllKeywords()}, function(response) {
            if(response && response.hasOwnProperty('result') && response.result=='selection_success' && response.hasOwnProperty('keywordItems')) {
              $scope.$apply(function($scope){
                $scope.keywords = response.keywordItems;
                                  var mails = $scope.keywords.map(function(word) {
                                 return word.totalMatched;
                           });
                    $scope.totalMails = mails.reduce(function(first,second) {
                   return first+second;
                });
     console.info("Total mail"+$scope.totalMails);
              })
            } else {

            }
        });
    });

   };


   $scope.deleteFilteredEmails = function() {
      $scope.deleting = true;
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {command: "deleteMails",keywords:$scope.keywords}, function(response) {
          
            if(response && response.hasOwnProperty('result') && response.result==='deleted') {
              $timeout(function(){
                $scope.$apply(function($scope){
                  $scope.deleting= false;
                });
              },3000);
            }
        });
    });
     
   };


// Called when the user clicks on the browser action.


   $scope.getCurrentTabURL = function() {
       chrome.tabs.getSelected(null, function(tab) {
           if(window.tabUrl.indexOf("mail.google.com") > -1) {
               console.log("Found : "+window.tabUrl);
               $scope.$apply(function () {
                   $scope.gmailTab = true;

                  
               });
           }
        })
   };

   $scope.getCurrentTabURL();



   
}]);

