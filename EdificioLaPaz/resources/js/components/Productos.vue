<template>
    <div class="productos">
        <div class="left-bar">
            <img src="https://cdn-icons-png.flaticon.com/512/107/107831.png" alt="Logo" class="logo"/>
            <h1 class="welcome-text">Bienvenido</h1>

            <nav class="menu-links">
                <a href="/dashboard">Inicio</a>
                <a href="#">Plan de Pagos</a>
                <a href="#">Pagos</a>
                <a href="#">Cerrar Sesion</a>
            </nav>
        </div>
        <!-- Contenido divs -->
        <div class="main-content">
            <p id="titulo">Productos Micromarket Edificio La Paz</p>
            <!--info-productos -->
            <div class="row">
                <div class="productoDiv">
                    <img src="https://carbonell.mx/wp-content/uploads/2023/06/800X800_OlivaClasico_2023-2.png" alt="producto1" class="productoLogo" />
                    <p>Nombre: </p>
                    <p>Categoria: </p>
                    <p>Estado: </p>
                    <p>Precio: </p>
                    <p>Cantidad: </p>
                </div>
                <div class="productoDiv">
                    <img src="https://aguai.com.bo/wp/wp-content/uploads/2023/02/BOLSA-5-KG-MORENA-EDIT-2-e1630588561180.png" alt="producto2" class="productoLogo" />
                    <p>Nombre: </p>
                    <p>Categoria: </p>
                    <p>Estado: </p>
                    <p>Precio: </p>
                    <p>Cantidad: </p>
                </div>
                <div class="productoDiv">
                    <img src="https://carbonell.mx/wp-content/uploads/2023/06/800X800_OlivaClasico_2023-2.png" alt="producto1" class="productoLogo" />
                    <p>Nombre: </p>
                    <p>Categoria: </p>
                    <p>Estado: </p>
                    <p>Precio: </p>
                    <p>Cantidad: </p>
                </div>
            </div>
            <div class="row">
                <div class="productoDiv">
                    <img src="https://static.wixstatic.com/media/d62617_8e0cbb0902f34c6bb053cb8f0288d2af~mv2.png/v1/fit/w_500,h_500,q_90/file.png" alt="producto3" class="productoLogo"/>
                    <p>Nombre: </p>
                    <p>Categoria: </p>
                    <p>Estado: </p>
                    <p>Precio: </p>
                    <p>Cantidad: </p>
                </div>
                <div class="productoDiv">
                    <img src="https://huevoscolorado.com/cdn/shop/products/HuevosMaple30.png?v=1587971745" alt="producto4" class="productoLogo"/>
                    <p>Nombre: </p>
                    <p>Categoria: </p>
                    <p>Estado: </p>
                    <p>Precio: </p>
                    <p>Cantidad: </p>
                </div>
                <div class="productoDiv">
                    <img src="https://static.wixstatic.com/media/d62617_8e0cbb0902f34c6bb053cb8f0288d2af~mv2.png/v1/fit/w_500,h_500,q_90/file.png" alt="producto3" class="productoLogo"/>
                    <p>Nombre: </p>
                    <p>Categoria: </p>
                    <p>Estado: </p>
                    <p>Precio: </p>
                    <p>Cantidad: </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "productos",
};
</script>

<style scoped>
.productos {
    display: flex;
    background-color: #0080fe;
    color: white;
    font-family: sans-serif;
    height: 100vh;
}
/*barra izquierda*/
.left-bar {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    background-color: #033b90;
    width: 250px;
    height: 100vh;
}
.logo {
    width: 50px;
    height: 50px;
    margin-bottom: 15px;
}
.welcome-text {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 30px;
}
.menu-links {
    display: flex;
    flex-direction: column;
    gap: 15px;
}
.menu-links a {
    color: white;
    text-decoration: none;
    font-weight: bold;
}
.menu-links a:hover {
    text-decoration: underline;
}
#titulo {
    text-align: center;
    font-size: 2rem;
    padding-bottom: 30px;
}
/* Contenedor principal de los gráficos */
.main-content {
    display: flex;
    flex-direction: column;
    padding: 30px;
    border: 3px solid white;
    background-color: #235fb7;
    border-radius: 10px;
    width: auto; 
    min-width: 300px;
    margin: auto; 
}
.row {
    display: flex;
    gap: 30px;
    margin-bottom: 30px;
}
/* Cuadro individual */
.productoDiv {
    flex: 1;
    padding: 20px;
    background-color: #05357d;
    color: white;
    border-radius: 10px;
    overflow: visible;
}
/* Logo del producto */
.productoLogo {
    position: relative;
    top: -50px; 
    left: 50%;  
    transform: translateX(-50%);
    width: 250px; 
    height: auto;
    margin-bottom: -40px;
    width: 150px;
    height: 200px;
}
</style>