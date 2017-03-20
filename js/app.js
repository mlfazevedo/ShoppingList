function storage(){
    
    var produtos = [];
    
    var produtos_str = localStorage.getItem('compras');
    
    
    if(produtos_str !== null){
        produtos = JSON.parse(produtos_str);
    }
    
    return produtos;
}
function storage2(){
    
    var arquivos = [];
    var arquivos_str = localStorage.getItem('arquivos');
    if(arquivos_str !== null){
        arquivos = JSON.parse(arquivos_str);
        
    }
    return arquivos;
}

function add(){
    
    var produto = document.getElementById('nome').value;
    var quantidade = document.getElementById('quantidade').value;
    
    if(!produto || !quantidade){
        
         alert("Os dados introduzidos estão incorretos!");
        
    }else{
       
        var produtos = storage();

        produtos.push(produto, quantidade);
    
        localStorage.setItem('compras', JSON.stringify(produtos));
       
        document.getElementById('nome').value = '';
        document.getElementById('quantidade').value = '';

    }
    
    show();     
    
}

function remove(){
    var id = this.getAttribute('id');
    var arquivos = storage2();
    arquivos.splice(id, 2);
    localStorage.setItem('arquivos', JSON.stringify(arquivos));
    
    show();
    
    return false;
}

function check(){
    
    var id = this.getAttribute('id');
    var produtos = storage();
    var arquivos = storage2();
    
    var a = produtos[id];
    id++;
    var b = produtos[id];
    id--;
    
    arquivos.push(a,b);
    
    localStorage.setItem('arquivos', JSON.stringify(arquivos));
    
    produtos.splice(id, 2);
    localStorage.setItem('compras', JSON.stringify(produtos));
    
    show();
    
    return false;
}

function uncheck(){
    
    var id = this.getAttribute('id');
    var produtos = storage();
    var arquivos = storage2();
    
    var a = arquivos[id];
    id++;
    var b = arquivos[id];
    id--;
    
    produtos.push(a,b);
    
    localStorage.setItem('compras', JSON.stringify(produtos));
    
    arquivos.splice(id, 2);
    localStorage.setItem('arquivos', JSON.stringify(arquivos));
    
    show();
    
    return false;
}

function show(){
    
    var produtos = storage();
    var arquivos = storage2();
    
    var html_Comprar = '';
    var html_Arquivo = '';
    
    //html Compras
    for(var i = 1; i < produtos.length; i+=2){
        if(html_Comprar == ''){
            
            html_Comprar += '<label class="control-label col-sm-12"><div class="col-sm-2">Quantidade</div><div class="col-sm-6">Nome</div><div class="col-sm-4">Comandos</div></label>' ;
            
            
            html_Comprar += '<div class="col-sm-2">'+produtos[i]+'</div><div class="col-sm-6">' + produtos[i-1] +'</div><div class="col-sm-4"><button class="check btn btn-info" id="'+(i-1)+'">&#10003</button></div>';
        }else{
            
        html_Comprar += '<div class="col-sm-2">'+produtos[i]+'</div><div class="col-sm-6">' + produtos[i-1] +'</div><div class="col-sm-4"><button class="check btn btn-info" id="'+(i-1)+'">&#10003</button></div>';
        }
    }
    //html Arquivo
    for(var i = 1; i < arquivos.length; i+=2){
        
        if(html_Arquivo == ''){
            
            html_Arquivo += '<label class="control-label col-sm-12"><div class="col-sm-8">Nome</div><div class="col-sm-4">Comandos</div></label>' ;

            html_Arquivo +='<div class="col-sm-8">'+arquivos[i-1]+'</div><div class="col-sm-4"><button class="remove btn btn-danger" id="' + (i-1) + '">&#10007</button> <button class="uncheck btn btn-success" id="'+(i-1)+'">&#10140</button></div>'; 
            
        }else{
            html_Arquivo +='<div class="col-sm-8">'+arquivos[i-1]+'</div><div class="col-sm-4"><button class="remove btn btn-danger" id="' + (i-1) + '">&#10007</button> <button class="uncheck btn btn-success" id="'+(i-1)+'">&#10140</button></div>'; 
        }   
      
    }



    //TEMPLATE
    document.getElementById('compras').innerHTML = html_Comprar;
    document.getElementById('arquivo').innerHTML = html_Arquivo;
    
    //Remover
    var buttons = document.getElementsByClassName('remove');
    for (var i=0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', remove);
    }; 
    
    //Check
    var checks = document.getElementsByClassName('check');
    for (var i = 0; i < checks.length; i++){
        checks[i].addEventListener('click', check);
    }
    
    //UnCheck
    var unchecks = document.getElementsByClassName('uncheck');
    for (var i = 0; i< unchecks.length; i++){
        unchecks[i].addEventListener('click', uncheck);
    }

}


document.getElementById("adicionar").addEventListener('click', add);
show();