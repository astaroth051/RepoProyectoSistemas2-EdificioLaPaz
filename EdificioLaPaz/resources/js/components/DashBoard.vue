<template>
    <div class="dashboard">
        <div class="left-bar">
            <img
                src="https://cdn-icons-png.flaticon.com/512/107/107831.png"
                alt="Logo"
                class="logo"
            />
            <h1 class="welcome-text">Bienvenido</h1>

            <nav class="menu-links">
                <a href="/productos">Productos</a>
                <a href="#">Plan de Pagos</a>
                <a href="#">Pagos</a>
                <a href="#">Cerrar Sesion</a>
            </nav>
        </div>
        <!-- Contenido divs -->
        <div class="main-content">
            <p id="titulo">Micromarket Edificio La Paz</p>
            <!--info-copropietario y cuentas -->
            <div class="row">
                <div class="info-copropietario">
                    <p>Aquí iría la información del copropietario.</p>
                </div>
                <!--<div class="info-copropietario" v-if="copropietario">
                        <p><strong>Nombre:</strong> {{ copropietario.nombre }}</p>
                        <p><strong>Departamento:</strong> {{ copropietario.departamento }}</p>
                        <p><strong>Email:</strong> {{ copropietario.email }}</p>
                    </div>
                    en teoria esto daria para mostrar la informacion del usuario logueado-->
                <div class="cuentas">
                    <h2>Gráfico de cuentas</h2>
                    <p>Aquí iría el gráfico de cuentas.</p>
                </div>
            </div>
            <!-- grafico resumen -->
            <div class="grafico-resumen">
                <h2>Gráfico de Gastos</h2>
                <p>Aquí iría el gráfico de gastos.</p>
            </div>
            <!-- saldo y resumen productos -->
            <div class="row">
                <div class="saldo">
                    <h2>Gráfico de saldo</h2>
                    <p>Aquí iría el saldo.</p>
                </div>
                <div class="resumen-productos">
                    <h2>Resumen de Productos</h2>
                    <p>Aquí iría el resumen de productos.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "DashBoard",
    data() {
        return {
            copropietario: null,
        };
    },
    mounted() {
        fetch("/copropietario/obtener", {
            credentials: "include",
        })
            .then((res) => {
                if (!res.ok) throw new Error("No autenticado o no encontrado");
                return res.json();
            })
            .then((data) => {
                this.copropietario = data;
            })
            .catch((err) => {
                console.error("Error al obtener copropietario:", err.message);
            });
    },
};
</script>

<style scoped>
.dashboard {
    display: flex;
    background-color: #0080fe;
    color: white;
    font-family: sans-serif;
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
    padding-bottom: 5px;
}
/* Contenedor principal de los gráficos */
.main-content {
    flex-grow: 1;
    padding: 30px;
}
/* Fila de dos columnas */
.row {
    display: flex;
    gap: 30px;
    margin-bottom: 30px;
}
/* Cuadro individual */
.info-copropietario,
.cuentas,
.grafico-resumen,
.saldo,
.resumen-productos {
    flex: 1;
    padding: 20px;
    background-color: #05357d;
    color: white;
    border-radius: 10px;
}
/* Para que grafico resumen use todo el ancho */
.grafico-resumen {
    margin-bottom: 30px;
}
</style>