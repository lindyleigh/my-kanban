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

    ItemController.$inject = ['EsService'];

    function ItemController(EsService) {
      var ic = this;

      ic.lists = EsService.getLists()
      ic.moveTask = function(task, targetListId) {
        EsService.moveTask(task.listId, targetListId, task);
      }
      
    }

}())

// <button style="display: inline-block; font-size: 10px" ng-click="$ctrl.moveTask($ctrl.taskObj)">Move Task</button>

// <button class='btn btn-default dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Move To</button>
//                 <ul class='dropdown-menu' ng-repeat="list in $ctrl.lists">
//                   <li ng-click='$ctrl.moveTask($ctrl.taskObj)'>{{$ctrl.newList.name}}</li>
//                 </ul>