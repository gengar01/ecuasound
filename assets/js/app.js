//Funcionalidades
const btnReaccion=document.getElementById('reaccion');
const contenedorListaMusic=document.getElementById('lista-music');
const controles=document.getElementById('controles');

const menuMusic=document.getElementById('menuMusic');
const titlePlaylist=document.getElementById('titlePlaylist');
const playDescription=document.getElementById('playDescription');
const imgAlbum=document.getElementById('imgAlbum');
const album=document.getElementById('album');

//eventos
btnReaccion.addEventListener('click',likear);
menuMusic.addEventListener('click',cargarInfo);
contenedorListaMusic.addEventListener('click',reproducirMusica);
controles.addEventListener('click',controlar);


//funciones
let estado=0;
function likear() {
    if (estado===0) {
        btnReaccion.classList.add('reaccion-activa');
        estado=1;
    }else if(estado===1){
        btnReaccion.classList.remove('reaccion-activa');
        estado=0;
        
    }
}

function cargarInfo(e){
    let jsonurl='';
    let titlePlay='';
    let descripcionPlay='';
    let srcImg='';

    if (e.target.classList.contains('playCultural')){
        jsonurl='assets/musicJSON/Cultural.json';
        titlePlay='Playlist Cultural';
        descripcionPlay='La mejor playlist de musica local para ti:';
        srcImg='https://www.larevistadevaldemoro.com/wp-content/uploads/2018/04/b447132b-ba10-4362-9d10-117353805698-640x435.png';
        album.style.background="linear-gradient(to right, rgba(2,2,2,0.726) 15%, rgba(8,8,8,0.829)), url(/assets/img/f-fondoo.jpg)";
        
    }else if(e.target.classList.contains('playFreestyle')){
        jsonurl='assets/musicJSON/Freestyle.json';
        titlePlay='Playlist FREESTYLE';
        descripcionPlay='La mejor playlist de Freestyle pata ti:';
        srcImg='https://sites.google.com/site/freestylerapcali/_/rsrc/1475597201246/config/customLogo.gif?revision=2';
        album.style.background="linear-gradient(to right, rgba(2,2,2,0.726) 15%, rgba(8,8,8,0.829)), url(/assets/img/f-fondoo.jpg)";
    }else if(e.target.classList.contains('playGlobal')){
        jsonurl='assets/musicJSON/Global.json';
        titlePlay='Playlist de Musica TOP esta semana';
        descripcionPlay='La mejor playlist para disfrutar';
        srcImg='https://st2.depositphotos.com/3367263/48299/v/600/depositphotos_482991854-stock-video-animation-of-molecules-over-woman.jpg';
        album.style.background="linear-gradient(to right, rgba(2,2,2,0.726) 15%, rgba(8,8,8,0.829)), url(https://www.gaceta.unam.mx/wp-content/uploads/2020/12/201210-Aca1-des-f1-musica-estres.jpg)";

    }
    titlePlaylist.innerHTML=titlePlay;
    playDescription.innerHTML=descripcionPlay;
    imgAlbum.src=srcImg;
    cargarMusica(jsonurl);
}

function cargarMusica(url){

    fetch(url)
    .then(function(res) {
         return res.json();
    })
    .then(function(data) {
        let html='';
        data.forEach (music=> {
            data.forEach(music =>{
                html+=`
                <li class="music">
                    <input type="text" value="${music.url}" style="display: none;">
                    <a href="#" id="${music.id}" class="btn play-music"><i class="far fa-play-circle" ></i></a>
                    <h3>${music.artista}</h3>
                    <h3 class="name" id="name">${music.nombre}</h3>
                    <h3 class="time">${music.duracion}</h3>
                    <a href="#" class="btn reaccion-inactiva" id="reaccion"><i class="fas fa-heart"></i></a>
                   
                </li>
                `
                contenedorListaMusic.innerHTML=html;
        });
        })

});
}

function reproducirMusica(e){
    if(e.target.parentElement.classList.contains('play-music')){
        let urlM= e.target.parentElement.previousElementSibling.value;
        controles.innerHTML=` 
        <a href="#" class="btn control atras"><i class="fas fa-backward"></i></a>;
        <audio src="${urlM}" style="width: 50vw;" controls autoplay><input type="text" value="${urlM}" style="display:
        none;"></audio>
        <a href="#" class="btn control siguiente"><i class="fas fa-forward"></i></a>`;
        e.target.parentElement.classList.add('reaccion-activa-reproducida');
        siguienteAutomatico();
}
}

function controlar(e){
    let audio= e.target.parentElement.parentElement.children[1].children[0];
    let audioUrl=audio.value;
    let musicArray=Array.from(contenedorListaMusic.children);
    if ( e.target.parentElement.classList.contains('siguiente')){
        musicArray.forEach(limusic=> {
            if (limusic.children[0].value ===audioUrl){
                let siguienteMusica = limusic.nextElementSibling.children[0].value;

                let elementoParaReproducido = limusic.nextElementSibling.children[1];
                siguienteAtras (siguienteMusica,elementoParaReproducido)
                
            }
        });
    }else if (e.target.parentElement.classList.contains('atras')) {
        musicArray.forEach(limusic=> {
            if (limusic.children[0].value ===audioUrl){
                let musicaAtras = limusic.previousElementSibling.children[0].value;

                let elementoParaReproducido = limusic.previousElementSibling.children[1];
                siguienteAtras (musicaAtras,elementoParaReproducido)
            }
        });
    }
}

function siguienteAtras ( musica,reproducida) {
    controles.innerHTML=` 
        <a href="#" class="btn control atras"><i class="fas fa-backward"></i></a>;
        <audio src="${musica}" style="width: 50vw;" controls autoplay><input type="text" value="${musica}" style="display:
        none;"></audio>
        <a href="#" class="btn control siguiente"><i class="fas fa-forward"></i></a>`;

        reproducida.classList.add('reaccion-activa-reproducida');
        siguienteAutomatico();
}

function siguienteAutomatico(){
    let audioEtiqueta = controles.children[1];
    audioEtiqueta.addEventListener('ended',()=>{
        let audioUrl = audioEtiqueta.children[0].value;
        let musicArray = Array.from(contenedorListaMusic.children);
        musicArray.forEach(limusic => {
            if (limusic.children[0].value ===audioUrl){
                let siguienteMusica = limusic.nextElementSibling.children[0].value;

                let elementoParaReproducido = limusic.nextElementSibling.children[1];
                siguienteAtras (siguienteMusica,elementoParaReproducido);
                
            }
        })
    })
}

const btnFiles= document.getElementById('files');
btnFiles.addEventListener('change',cargarArchivos)
function cargarArchivos(e){
const files=[...e.target.files];
files.forEach(f=>{
    const reader=new FileReader();

    reader.onload=(function(archivo){
        return function(evt){
            const li=document.createElement('li');
            li.classList.add('music');
            li.innerHTML=`
            <li class="music">
                    <input type="text" value="${evt.target.result}" style="display: none;">
                    <a href="#" " class="btn play-music"><i class="far fa-play-circle" ></i></a>
                    <h3>${archivo.name}</h3>
                    <h3 class="name" id="name"></h3>
                    <h3 class="time"></h3>
                </li>`
                contenedorListaMusic.appendChild(li);

        }
    })(f)
    reader.readAsDataURL(f);
})
}