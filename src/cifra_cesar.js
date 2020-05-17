const{numero_casas, token, cifrado} = require('./answer.json');
const fs = require('fs');
const fileName = './answer.json';
const file = require(fileName);
	let casas = numero_casas;
	let cifra = cifrado;

function cifraCZ (casas,cifra) {
	


		let alphabeto = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

		let decipher = '';

		for(let i = 0; i < cifra.length; i++){

			let k = cifra.charCodeAt([i]);

			if(cifra[i] === '.' || cifra[i] === ' ' || cifra[i] === Number){
				decipher += cifra[i];
			}else{
				k = ((k+2) - 97 + casas) % 26;
				decipher += alphabeto[k];
			}
		}


		const ReadF = fs.readFileSync(fileName);
		const ReadData = JSON.parse(ReadF);

		//console.log(ReadData.numero_casas);
		//console.log(Object.keys(ReadData));
		//console.log(ReadData.token);

		ReadData.decifrado = decipher;

		let Edit_ReadData = JSON.stringify(ReadData);
		//console.log('HOIAAA:'+ Edit_ReadData);
		fs.writeFileSync(fileName, Edit_ReadData);
		console.log('Arquivo atualizado com a frase descriptografada!');

}

//cifraCZ(casas,cifra);

module.exports = {cifraCZ}










