(function () {

  angular.module('kanban')
    .service('EsService', function ($rootScope) {

      var lists = {

      };

      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }

      function assignId() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4();
      }

      this.getLists = function () {
        return getLists();
      }

      this.createList = function (list) {
        list.id = assignId();
        list.tasks = {};
        lists[list.id] = list;
        saveLists()
      }

      this.removeList = function (listId) {
        if (!lists[listId]) {
          console.error('SoRRY BAD ID, you are lame and I don\'t like you.')
        }
        delete lists[listId]
        saveLists()
      }

      this.createTask = function (listId, task) {
        if (!lists[listId]) {
          console.error('SoRRY BAD ID, you are lame and I don\'t like you.')
        }
        task.id = assignId();
        task.listId = listId;
        lists[listId].tasks[task.id] = task;
        saveLists()
      }

      this.removeTask = function (listId, task) {
        if (!lists[listId]) {
          console.error('SoRRY BAD ID, you are lame and I don\'t like you.')
        }
        delete lists[listId].tasks[task.id];
        saveLists()
      }

      this.moveTask = function (currentListId, targetListId, task) {
        var temp = task;
        delete lists[currentListId].tasks[task.id]
        task.listId = targetListId
        lists[targetListId].tasks[task.id] = task
        saveLists()
      }

      function saveLists() {
        localStorage.setItem('lists', JSON.stringify(lists));
        $rootScope.$broadcast('change')
      }

      function getLists() {
        var x = localStorage.getItem('lists');
        if (x) {
          lists = JSON.parse(x);
        }
        return lists;
      }


    })

} ())