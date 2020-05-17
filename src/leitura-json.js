const fetch = require('node-fetch');
const fs = require('fs');


function callJSON () {
	
	let url = "https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=4da061c3bdc41efdb4682e0bedd878d6993016b3";
	
	let settings = { method: "Get"};

	fetch(url, settings)
		.then(res => res.json())
		.then((json) => {

	let conteudo = JSON.stringify(json);
	
	//console.log(res)
	fs.writeFile('answer.json', conteudo);
	    	console.log("Arquivo salvo"); 
	});

}


//callJSON();

module.exports = {callJSON}

