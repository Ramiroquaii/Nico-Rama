




// async function getUserData(url, data) {
//     try {
//     const response = await fetch(url, {
//         method: 'POST',
//         body: JSON.stringify(data),
//         header: {
//             'Content-Type': 'application/json'
//         }
//     });
    
//     const responseData = await response.json();

//     document.getElementById('bienvenida').innerHTML += responseData
//     console.log(responseData);
//     } catch (error) {
//     console.error(error);
//     }
// };

// getUserData('/signup', userNameOk)



async function getData(url) {
    try {
    const response = await fetch(url);
    
    const responseData = await response.json();
    let htmlString = '';
    responseData.forEach(products => {
        // desestructurando cada producto
        const {_id, foto, nombre, descripcion, tamanio, precio} = products

        htmlString +=`<article class="cardBox">
                                    <figure class="fotoProducto">
                                        <img src="${foto}" alt="">
                                    </figure>
                                    <div class="marcoSkew">
                                        <h4 class="modelo">${nombre}</h4>
                                    </div>
                                    
                                    <figure class="estrellaFigure">
                                        <img class="afueraCarrito" id="${_id}" src="assets/img/estrella_tienda.svg" alt="">
                                    </figure>
                                    
                                    <div class="detalle">
                                        <img class="afueraCarrito" id="${_id}" src="assets/img/sumar_a_carrito.svg" alt="">
                                    </div>

                                    <div class="caracteristicas">
                                        <p class="tipo">${descripcion}</p>
                                        <div class="barra"></div>
                                        <p class="medida">${tamanio}</p>
                                    </div>
                                    <p class="precio">${precio}</p>
                                    <button class="addProduct">Agregar a carrito</button>
                                </article>`
    });
    document.getElementById('productList').innerHTML = htmlString
    console.log(htmlString);
    } catch (error) {
    console.error(error);
    }
};

getData('/profile')
