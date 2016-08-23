(function(){

  angular.module('kanban')
    .component('listComponent', {
      templateUrl: 'app/components/list/list.html',
      controller: ListController,
      controllerAs: 'lc',
      bindings: {
        listObj: '<'
      }
    })

    ListController.$inject = ['EsService']

    function ListController(EsService) {
      var lc = this;
      lc.addingTask = false;

      lc.removeTask = function(task){
        EsService.removeTask(lc.listObj.id,task);
      }

      lc.addTask = function(task){
        EsService.createTask(lc.listObj.id, task);
        lc.newTask = {};
      }
    }

}())