(function () {

  angular.module('kanban')
    .component('boardComponent', {
      templateUrl: 'app/components/board/board.html',
      controller: BoardController,
      controllerAs: 'bc'
    })

  BoardController.$inject = ['EsService', '$document', '$rootScope']

  function BoardController(EsService, $document, $rootScope) {
    var bc = this;
    bc.lists = EsService.getLists();
    bc.addingList = false;

    bc.removeList = function (list) {
      EsService.removeList(list.id);
    }

    bc.addList = function (list) {
      EsService.createList(list);
      bc.newList = {};
    }

    bc.scrollTo = function (id) {
      $document
        .scrollToElement(
        angular.element(document.getElementById(id)), 0, 1000
        );
    }

    $rootScope.$on('change', function(){
      bc.lists = EsService.getLists();
    })

  }

} ())