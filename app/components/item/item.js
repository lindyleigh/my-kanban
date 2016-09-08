(function(){

  angular.module('kanban')
    .component('itemComponent', {
      templateUrl: 'app/components/item/item.html',
      controller: ItemController,
      controllerAs: 'ic',
      bindings: {
        taskObj: '<'
      }
    })

    ItemController.$inject = ['$rootScope','EsService'];

    function ItemController($rootScope, EsService) {
      var ic = this;

      ic.lists = EsService.getLists()

      $rootScope.$on('change', function(){
        ic.lists = EsService.getLists()
      })

      ic.moveTask = function(task, targetListId) {
        EsService.moveTask(task.listId, targetListId, task);
      }
      
    }

}())
