(function() {
  
  angular.module('kanban')
    .service('EsService', function(){

      var lists = {

      };

      var i = 500;
      function assignId(){
        i++;
        return i;
      }

      this.getLists = function(){
        return lists;
      }

      this.createList = function(list){
        list.id = assignId();
        list.tasks = [];
        lists[list.id] = list;
      }

      this.removeList = function(listId){
        if(!lists[listId]){
          console.error('SoRRY BAD ID, you are lame and I don\'t like you.')
        }
        delete lists[listId]
      }

      this.createTask = function(listId, task){
        if(!lists[listId]){
          console.error('SoRRY BAD ID, you are lame and I don\'t like you.')
        }
        task.listId = listId;
        lists[listId].tasks.push(task);
      }

      this.removeTask = function(listId, task){
        if(!lists[listId]){
          console.error('SoRRY BAD ID, you are lame and I don\'t like you.')
        }
        var i = lists[listId].tasks.indexOf(task);
        lists[listId].tasks.splice(i, 1);
      }

      this.moveTask = function(currentListId, targetListId, task) {

        var i = lists[currentListId].tasks.indexOf(task);
        lists[currentListId].tasks.splice(i, 1)
        task.listId = targetListId
        lists[targetListId].tasks.push(task)
      }

       function saveLists(lists){
        localStorage.setItem('lists', JSON.stringify(lists));
      }

      function getLists(){
        var lists = localStorage.getItem('lists');
        if(lists){
          lists = JSON.parse(lists);
        }
        return JSON.parse(lists);
      }


    })

}())