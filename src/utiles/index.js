var host = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 'http://localhost/documentation/public/back/index.php' : (window.location.protocol+'//'+window.location.hostname+'/back');

const post = (data) => {
	return new Promise((resolve, reject) => {
		fetch(host, {
			method: 'POST',
			headers: {'Token': 'ZXN0ZSBlcyBlbCB0b2tlbiBkZSBhY2Nlc28uLi4='},
			body: JSON.stringify(data)
		}).then(d => d.text()).then(res => {
			if(res.indexOf('{') > -1) {
				res = JSON.parse(res);
				resolve(res);
			}else {
				resolve(res);
			}
		}).catch(err => {
			reject(err);
		})
	})
}

exports.post = post;
exports.url = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 'http://localhost/documentation/public/back/files' : (window.location.protocol+'//'+window.location.hostname+'/back/files');