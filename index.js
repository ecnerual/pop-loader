export function loadData(url, expectedStatus, apiToken) {

	return new Promise((resolve, reject) => {

		var req =  new XMLHttpRequest();
		req.open('Get', url);

		req = setTokenHeader(req, apiToken);
		

		req.onload = e => {
			let response = JSON.parse(e.currentTarget.response);

			let succeed = expectedStatus ? req.status === expectedStatus : 
										   req.status >= 200 && req.status <= 300;
	
			return succeed ? resolve(response) : reject(response);
		};
		
		req.onerror = e => {
			let res = e.currentTarget.statusText;
			return reject(new Error('Error of status : ' + res));
		}

		req.send();
	});

}

export function updateData(url, payload, expectedStatus = 200, apiToken) {
	return new Promise((resolve, reject) => {

		var req = new XMLHttpRequest();
		req.open('Put', url);
		req.setRequestHeader('Accept', 'application/json');
		req.setRequestHeader('Content-type', 'application/json');
		req = setTokenHeader(req, apiToken);

		req.onload = e => {
			let response = JSON.parse(e.currentTarget.response);

			let succeed = expectedStatus ? req.status === expectedStatus : 
										   req.status >= 200 && req.status <= 300;
	
			return succeed ? resolve(response) : reject(response);
		};

		req.onerror = e => {
			let res = e.currentTarget.statusText;
			return reject(new Error('Error of status : ' + res));
		};

		req.send(JSON.stringify(payload));
	});
}

export function sendData(url, payload, expectedStatus = 201, apiToken) {
	return new Promise((resolve, reject) => {
		var req = new XMLHttpRequest();
		req.open('Post', url);
		req.setRequestHeader('Accept', 'application/json');
		req.setRequestHeader('Content-type', 'application/json');
		
		req = setTokenHeader(req, apiToken);

		req.onload = e => {
			let response = JSON.parse(e.currentTarget.response);

			let succeed = expectedStatus ? req.status === expectedStatus : 
										   req.status >= 200 && req.status <= 300;
	
			return succeed ? resolve(response) : reject(response);
		};

		req.onerror = e => {
			let res = e.statusText;
			return reject(new Error('Error of status : ' + res));
		};

		req.send(JSON.stringify	(payload));
	});
}

export function deleteRequest(url, apiToken) {
	return new Promise((resolve, reject) => {

		var req = new XMLHttpRequest();
		req.open('delete', url);
		req = setTokenHeader(req, apiToken);

		req.onload = e => {
			if(req.status === 200 || req.status === 204) {
				return resolve();
			} else {
				return reject();
			}
		};

		req.onerror = e => {
			let res = e.currentTarget.statusText;
			reject(new Error(res));
		};

		req.send();
	});
}

function setTokenHeader(req, apiToken) {
	if(apiToken) {
		req.setRequestHeader('Authorization', apiToken);
	}

	return req;
}