jQuery(document).ready(function ($) {
	var parseId = "IMt3CmaP2RxCg9QDzkubiHFFLh1KRPpQe84qYF24",
		parseRestKey = "vVlGwcSyuDzjR4jD1vSjZOE0mR7bdGI4NITEPyzD",
		table = $('#tbody'),
		sendBtn = $("#send");

	getMessages();
	updateDelate();

	function updateDelate() {
		table.on('click', '.delete', function (event) {
			var userId = event.target.id;
			$.ajax({
				url: 'https://api.parse.com/1/classes/MessageBoard/' + userId,
				headers: {
					'X-Parse-Application-ID': parseId,
					'X-Parse-REST-API-Key': parseRestKey
				},
				type: 'DELETE',
				success: function () {
					getMessages();
				},
				error: function (err) {
					console.log("AJAX error in request: " + JSON.stringify(err, null, 2));
				}
			});
		});
	}

	sendBtn.click(function () {
		var username = $("input[name=username]").attr("value"),
			surename = $("input[name=surename]").attr("value"),
			message = $("input[name=message]").attr("value");

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
				'surename': surename,
				'message': message
			}),
			type: 'POST',
			success: function () {
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
		});
	}

	function updateView(messages) {
		var trEl;
		$.each(messages.results, function (index, value) {
			trEl += '<tr><td>' + (++index) + '</td><td>' + value.username + '</td><td>' + value.surename + '</td><td>' + value.message + '</td><td><a id="' + value.objectId + '" class="button alert round delete">X</a></td></tr>';
		});
		table.html('').append(trEl);
	}
});