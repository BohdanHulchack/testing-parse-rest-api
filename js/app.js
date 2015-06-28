jQuery(document).ready(function ($) {
	var parseId = "IMt3CmaP2RxCg9QDzkubiHFFLh1KRPpQe84qYF24",
		parseRestKey = "vVlGwcSyuDzjR4jD1vSjZOE0mR7bdGI4NITEPyzD";
	getMessages();

	$("#send").click(function () {
		var username = $("input[name=username]").attr("value"),
			surename = $("input[name=surename]").attr("value");
		console.log(username + ' ' + surename);
		$.ajax({
			url: 'https://api.parse.com/1/classes/MessageBoard',
			headers: {
				'X-Parse-Application-ID': parseId,
				'X-Parse-REST-API-Key': parseRestKey
			},
			contentType: 'application/json',
			dataType: 'json',
			processData: false,
			data: JSON.stringify({
				'username': username,
				'surename': surename
			}),
			type: 'POST',
			success: function () {
				console.log('sent' + username + ' ' + surename);
				getMessages();
			},
			error: function (err) {
				console.log("AJAX error in request: " + JSON.stringify(err, null, 2));
			}
		});
	});

	function getMessages() {
		$.ajax({
			url: 'https://api.parse.com/1/classes/MessageBoard',
			headers: {
				'X-Parse-Application-ID': parseId,
				'X-Parse-REST-API-Key': parseRestKey
			},
			contentType: 'application/json',
			dataType: 'json',
			type: 'GET',
			success: function (data) {
				console.log('get' + data);
				updateView(data);
			},
			error: function (err) {
				console.log("AJAX error in request: " + JSON.stringify(err, null, 2));
			}
		})
	}

	function updateView(messages) {
		var table = $('.tbody');
		table.html('');
		$.each(messages.results, function (index, value) {
			var trEl = $('<tr><td>' + value.username + '</td><td>' + value.surename + '</td></tr>');
			table.append(trEl);
		});
		console.log(messages);
	}
})