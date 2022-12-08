import './Card.css';

export default function Cards ({nomeProduto,valorProduto,codProduto,imgem}){
    return(


      
            < div className='card'>
               <div className='img'>
                   <img src={imgem} width={150} height={150}/> 
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