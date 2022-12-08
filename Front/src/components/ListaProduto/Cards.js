import './Card.css';

export default function Cards ({nomeProduto,valorProduto,codProduto,imagem}){
    return(


      
            < div className='card'>
         <div className='img'>
                   <img src={imagem} width={150} height={150}/> 
                </div>   
          
                <div className='codProduto'>
                     {codProduto}
                </div>
                <div className='nomeProduto'>
                    {nomeProduto}
                </div>
                <div className='valorProduto'>
                    {'R$' + valorProduto}
                </div>
            </div>
      
      
    )
}