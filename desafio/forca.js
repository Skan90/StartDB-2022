class Forca {
  constructor 
  ( palavraSecreta,
    estadoEsperado, 
    posicao = [],
    letrasChutadas = [],
    erro = 0,
    vidas =6,
    primeiraRodada = 1,
    palavra = [],
    proibidos = [undefined, null,"^", "?", "'",'~',';','.',',',
    '/', '[', ']', '\\', '-', '=','0','1', '2', '3', '4', '5',
    '6', '7', '8','9', "_", "*", "¹", "|", "(", ")", "§", "+",
    "&", "°", "£", "¢", "%", "¬", "¨", "ª", "º", ">", "<",
    "²", "³", '"', "`", "\`"],
    underscore = 1)
    {
      this.palavraSecreta = palavraSecreta
      this.estadoEsperado = estadoEsperado
      this.posicao = posicao
      this.letrasChutadas = letrasChutadas
      this.erro = erro
      this.vidas = vidas
      this.primeiraRodada = primeiraRodada
      this.palavra = palavra
      this.proibidos = proibidos
      this.underscore = underscore
      
    }
    
    
    chutar(chute) {
      
      let letra = chute
      
      //Transforma a palavraSecreta em Array
      const palavraSecretaAr = Array.from(this.palavraSecreta)
      

      /*Na primeira rodada adiciona ao Array palavra a mesma
      a mesma quantidade de "_" (underscore) 
      que o Array da palaavra Secreta*/
      if(this.primeiraRodada == 1){
        
        palavraSecretaAr.forEach(() => {
          this.palavra.push("_")
          this.underscore = this.underscore + 1
        })
        this.underscore = this.underscore - 1
        this.primeiraRodada = 0
      }


      //Checa a entrada recebida pelo usuário por caracteres especiais 
      this.proibidos.forEach((entrada) => {
        if (entrada == letra){
          return this.erro = 2
        }
      })
      
      //Checa a entrada recebida pelo usuário por letras já chutadas
      this.letrasChutadas.forEach((entrada) => {
        if (entrada == letra.toLowerCase()){
          return this.erro = 1
        } 
        
      })
      

      //Checa a entrada recebida pelo usuário por mais de uma letra
      if (letra.length != 1)
      {
        return console.log("Por favor, digite apenas 1 (uma) letra. Tente novamente.")
        
      }
      // Se letra já consta no Array de chutados, retorna mensagem de erro
      else if(this.erro == 1){
        this.erro = 0
        return console.log("Você já usou essa letra, tente uma diferente.")
      } 
      // Se letra consta no Array de proibidos, retorna mensagem de erro
      else if (this.erro == 2) {
        this.erro = 0
        return console.log("Por favor, digite apenas letras. Tente novamente.")
      } 
      // Caso todos os testes de exceção falhem, começa a inclusão de dados
      else {
        //Acrescenta chute ao Array de chutes efetuados após todas as verificações de exceção 
        this.letrasChutadas.push(letra.toLowerCase())

        //registra quais posições/índices (se houver) na palavra secreta são correspondentes a letra chutada em um Array
        palavraSecretaAr.forEach((entrada, index) => {
          
          if (entrada == letra.toLowerCase()){
            this.posicao.push(index)
          }
          
          
        })
        
        //Se a letra digitada não estiver na palavra, retira uma vida e retorna mensagem
        if (this.posicao.length == 0){
          this.vidas = this.vidas - 1
          console.log("\nA letra não existe na palavra.\nVocê perdeu uma vida: \uD83D\uDC94\n")       
        } 
        //Se a letra digitada estiver na palavra retorna mensagem
        
        else {
          console.log("PARABÉNS! Você ACERTOU! \uD83D\uDC96")

          //Contador para saber se todas as posições já foram preenchidas (se ganhou)
          this.underscore = this.underscore - Number(this.posicao.length)

          //troca letras pelas palavras correspondentes nos indices guardados no Array "posicao"
          for(let i = 0; i != this.posicao.length; i++){
            const j = this.posicao[i] 
            this.palavra[j] = letra
          }
          //Retira todos o conteúdo dos índices no Array posicao
          while(this.posicao.length > 0) {
            this.posicao.pop();
          }
          
        }
        
        
        
      }
      
    }
    
    
    
    
    buscarEstado() { 
      if (this.underscore == 0){
        this.estadoEsperado = "ganhou";
      }
      if(this.vidas == 0){
        this.estadoEsperado = "perdeu";
      }
      
      if(this.vidas != 0 && this.underscore != 0){
        
        this.estadoEsperado = "aguardando chute";
      }
      return this.estadoEsperado
    } // Possiveis valores: "perdeu", "aguardando chute" ou "ganhou"
    
    
    buscarDadosDoJogo() {
      
      return {
        'vidas': this.vidas, // Quantidade de vidas restantes
        'palavra': this.palavra,// Deve ser um array com as letras que já foram acertadas ou o valor "_" para as letras não identificadas
        'letrasChutadas': this.letrasChutadas, // Deve conter todas as letras chutadas
        
      }
    }
  }
  
  module.exports = Forca;
  
  