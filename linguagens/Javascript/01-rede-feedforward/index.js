function funSum(arr=[]){
    return arr.reduce((a, b) => a + b);
}

function gradientDescent(n=0){
    return n * (1 - n);
}

function feedForward(inputs=[], target=0, epochs=1, activation='sigmoid'){
    if(target <=0) target = 0.1;
    else if(target > 1) target  = 1;

    let weights = [];

    //Cada valor de entrada(input[]) terá um peso weight
    for(let i=0; i < inputs.length; i++){
        weights.push(Math.random());
    }

    for(let i=1; i <= epochs; i++){
        let multiply = [];
        // um peso por uma entrada
        for(let j = 0; j < inputs.length; j++){
            if(inputs[j] <= 0) inputs[j] = 0.1;
            multiply.push(inputs[j] * weights[j]);
        }

        let sum = funSum(multiply);
        let output = 0;
        switch(activation){
            case 'tanh' : output = parseFloat(tanh(sum)).toFixed(4); break;
            case 'sigmoid' : output = parseFloat(sigmoid(sum)).toFixed(4); break;
            case 'relu' : output = parseFloat(relu(sum)).toFixed(4); break;
            case 'leakyRelu' : output = parseFloat(leakyRelu(sum)).toFixed(4); break;
            case 'binaryStep' : output = parseFloat(binaryStep(sum)).toFixed(4); break;
            default: output = parseFloat(sigmoid(sum)).toFixed(4); break;
        }
        

        let error =  parseFloat(Math.abs(target - output)).toFixed(4);

        for(let j=0; j < inputs.length; j++){
            if(inputs[j] <= 0) inputs[j] = 0.1;
            weights[j] += inputs[j] * gradientDescent(error);
        }
        let epoch = i.toString().padStart(7, '0');
       
        console.log(`época: ${epoch} - taxa de erro: ${error} - saida ${output}`);

    }//Fim For
}

feedForward([0], 0.1, 800,"relu");
//feedForward([0, 0], 0.2, 1000);

//tangente hiperbólica: retorna valores entre -1 e 1
function tanh(n=0){return (Math.sinh(n) / Math.cosh(n));}

//Função sigmoid: retorna entre 0 e 1
function sigmoid(n=0){return 1/(1 + Math.pow(Math.E, -n))}

//Unidade linear retificada (relu): retorna valores nulos e positivos
function relu(n=0) {return Math.max(n , 0);}

function leakyRelu(n=0) {return Math.max(n, 0.01);}

//retorna 0 ou 1 
function binaryStep(n=0){ return (n >= 0) ? 1 : 0;}