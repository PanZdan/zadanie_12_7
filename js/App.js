// OGÓLNA FUNKCJA
var cards = [];
var columns = [];
var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
  'X-Client-Id': '2485',
  'X-Auth-Token': '3d0b0fd9a97416d989a9c29123356a77'
};

$.ajaxSetup({
	headers: myHeaders
});

$.ajax({
    url: baseUrl + '/board',
    method: 'GET',
    success: function(response) {
      setupColumns(response.columns);
    }
});

function setupColumns(columnsFromApi) {
    columnsFromApi.forEach(function (column) {
  		  var col = new Column(column.id, column.name);
        board.createColumn(col);
        setupCards(col, column.cards);
        columns.push(col);
    });
}

function setupCards(col, cardsFromApi) {
	cardsFromApi.forEach(function (card) {
      var card = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
    	col.createCard(card);
      cards.push(card);
  	})
}