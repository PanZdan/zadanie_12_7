var board = {
	name: 'Tablica Kanban',
	createColumn: function(column) {
	  this.element.append(column.element);
	  initSortable();
	},
	element: $('#board .column-container')
};

$('.create-column')
    .click(function() {
        var columnName = prompt('Enter a column name');
        $.ajax({
    		url: baseUrl + '/column',
    		method: 'POST',
    		data: {
            	name: columnName
    		},
    		success: function(response){
    			var column = new Column(response.id, columnName);
    			board.createColumn(column);
          	}
        });
});
function initSortable() {
    $('.card-list').sortable({
      connectWith: '.card-list',
      placeholder: 'card-placeholder',
      update: function(event, ui) {
        if (ui.sender) {
          var card = ui.item;
          var cardId = card.attr('data-card-id');
          var cardName = card.find('.card-description').text();

          var columnId = card.parent()
            .parent()
            .attr('data-column-id');

          $.ajax({
            url: baseUrl + '/card/' + cardId,
            method: 'PUT',
            data: {
              name: cardName,
              bootcamp_kanban_column_id: columnId
            },
            success: function(response) {
                console.log('hurra! ' + response.id);
            }
          });

        }
      }
    }).disableSelection();
  }