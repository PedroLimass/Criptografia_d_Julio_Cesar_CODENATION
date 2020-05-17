const fetch = require('node-fetch');
const fs = require('fs');
const crypto = require("crypto");
const request = require("request");
const { join } = require("path");

function writeJson () {
	
	return new Promise ((resolve, reject)=>{
		let url = "https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=4da061c3bdc41efdb4682e0bedd878d6993016b3";
		
		let settings = { method: "Get"};

		fetch(url, settings)
			.then(res => res.json())
			.then((json) => {

		let conteudo = JSON.stringify(json);
		
		//console.log(res)
		fs.writeFileSync('answer.json', conteudo);
			setTimeout(()=>{
		    	resolve(console.log("Arquivo salvo")); 
		    },);
		});
	})
}



async function main(){
	try {
		console.log('Criando Doc answer.json . . . .');
		await writeJson();


	} catch(e) {
		// statements
		console.log('Algo deu ERRADO:'+ e);
	}
}


main(); //Creating a file answer.json

setTimeout(()=>{
	const{numero_casas, token, cifrado} = require('./answer.json');
	
	

		
			let casas = numero_casas;
			let cifra = cifrado;


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

			//console.log(ReadData.numero_casas);
			//console.log(Object.keys(ReadData));
			//console.log(ReadData.token);
			const fileName = './answer.json';
			const file = require(fileName); 
			const ReadF = fs.readFileSync(fileName);
			const ReadData = JSON.parse(ReadF);

			// SHA1
			const resumo = crypto.createHash("sha1").update(decipher).digest("hex");
			//END SHA1


			ReadData.decifrado = decipher; // decifrado: 'decipher'
			ReadData.resumo_criptografico = resumo; //Resumo do SHA1

			let Edit_ReadData = JSON.stringify(ReadData);
			//let ResumoSh1 = JSON.stringify(ReadData);
			//console.log('HOIAAA:'+ Edit_ReadData);
			fs.writeFileSync(fileName, Edit_ReadData);
			console.log('Arquivo atualizado com a frase descriptografada!');
},3000);

setTimeout(()=>{
const newAnswer = fs.createReadStream(join(__dirname, "answer.json"));

  request(
    {
      method: "POST",
      url: 'https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=4da061c3bdc41efdb4682e0bedd878d6993016b3',
      headers: {
        "Content-Type": "multipart/form-data",
      },
      formData: {
        answer: newAnswer,
      },
    },
    (err, res, body) => {
      if (err) {
        return console.error("Falha ao enviar arquivo:", err);
      }
      console.log("Arquivo POSTado com Sucesso! \n Resposta do Servidor:", body);
    }
  );

},4000);