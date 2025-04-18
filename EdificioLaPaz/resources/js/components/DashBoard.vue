<template>
    <div class="dashboard">
      <div class="left-bar">
        <img src="https://cdn-icons-png.flaticon.com/512/107/107831.png" alt="Logo" class="logo" />
        <h1 class="welcome-text">Bienvenido</h1>
  
        <nav class="menu-links">
          <a href="#">Inicio</a>
          <a href="#">Ejemplo2</a>
          <a href="#">Ejemplo3</a>
        </nav>
      </div>
  
      <div class="info-section">
        <p>Aquí iría la información del copropietario.</p>
      </div>
      <div class="resumen-productos">
        <h2>Resumen de Productos</h2>
        <p>Aquí iría el resumen de productos.</p>
      </div>
      <div class="grafico-resumen">
        <h2>Gráfico de Gastos</h2>
        <p>Aquí iría el gráfico de gastos.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "DashBoard",
  };
  </script>
  
  <style scoped>
.dashboard {
    display: flex;
    background-color: #0080FE;
    color: white;
    font-family: sans-serif;
}
  /*barra izquierda*/
.left-bar {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    background-color: #006AD5;
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
  /*info copropietario*/
.info-section {
    margin: 30px;
    padding: 20px;
    background-color: white;
    color: #000;
    border-radius: 10px;
}
.grafico-resumen {
    margin: 30px;
    padding: 20px;
    background-color: white;
    color: #000;
    border-radius: 10px;
}
.resumen-productos {
    margin: 30px;
    padding: 20px;
    background-color: white;
    color: #000;
    border-radius: 10px;
}
</style> 