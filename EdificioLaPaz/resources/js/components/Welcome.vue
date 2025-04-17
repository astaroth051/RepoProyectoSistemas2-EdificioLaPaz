<template>
  <router-view />
  <div class="page-wrapper">
    <header>
      <h1 id="h1Bienvenida">Bienvenido</h1>
    </header>

    <main class="main-content">
      <div class="container">
        <form action="action_page.php" method="post">
          <div class="titulo-logo">
            <h1 id="h1Sesion">Inicia Sesión</h1>
            <img src="https://cdn-icons-png.flaticon.com/512/107/107831.png" alt="Logo" class="logo" />
          </div>

          <div class="container">
            <label for="nombre"><b>Username</b></label>
            <input type="mail" placeholder="Ingrese Correo" name="nombre" required>

            <label for="psw"><b>Contraseña</b></label>
            <input type="password" placeholder="Ingrese contraseña" name="psw" required>

            <button type="submit">Login</button>
            <label>
              <input type="checkbox" name="recordar"> Recuerdame
            </label>
          </div>

          <div class="container">
            <button type="button" class="cancelbtn">Cancel</button>
            <span class="psw">No me <a href="#">acuerdo</a></span>
          </div>
        </form>
      </div>
    </main>

    <footer><div class="footer-socials">
        <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="whatsapp" /></a>
        <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" alt="email" /></a>
      </div>
      <div class="footer-info">
        <p>Desarrollado por Kansas</p>
        <p>Política de Privacidad | Términos de Servicio</p>
      </div>
      
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
}
</script>

<style scoped>
.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.main-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2892D7;
  padding: 30px;
}
#h1Bienvenida {
  color: black;
  padding-left: 20px;
  font-size: 2em;
  font-weight: bold;
}
#h1Sesion {
  color: black;
  font-size: 2em;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
}
footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f0f0f0;
  padding: 20px 40px;
  border-radius: 5px;
  flex-wrap: wrap;
}
.footer-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.footer-socials {
  display: flex;
  gap: 15px;
}
.footer-socials img {
  width: 30px;
  height: 30px;
  cursor: pointer;
}
header{
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 5px;
  background-image: url("https://i.pinimg.com/originals/8d/e5/5a/8de55a489bae9f0f174145165578c3b6.jpg");
}
footer {
  text-align: center;
  flex-shrink: 0;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
form {
  border: 3px solid #000000;
  padding: 30px;
  width: 100%;
  max-width: 600px;
  background-color: #6DAEDB;
  font-size: 1.2rem;
}
input[type=mail], input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  font-size: 1.1rem; 
  box-sizing: border-box;
}
button {
  background-color: #04AA6D;
  font-size: 1.1rem; 
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}
button:hover {
  opacity: 0.8;
}
.cancelbtn {
  width: auto;
  padding: 10px 18px;
  background-color: #f44336;
}
.titulo-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
}
.titulo-logo img.logo {
  width: 50px;
  height: 50px;
  border-radius: 30%;
}
span.psw {
  float: right;
  padding-top: 16px;
}

</style>
