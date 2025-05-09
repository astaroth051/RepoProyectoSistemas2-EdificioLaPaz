import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

interface Copropietario {
  nombre: string;
  departamento: string;
  email: string;
  telefono: string;
  carnet: string;
  estado: string;
}

const DashboardClient: React.FC = () => {
  const [copropietario, setCopropietario] = useState<Copropietario | null>(null);

  useEffect(() => {
    fetch('/copropietario/obtener', { credentials: 'include' })
      .then((res) => {
        if (!res.ok) throw new Error('No autenticado o no encontrado');
        return res.json();
      })
      .then((data) => {
        setCopropietario(data);
      })
      .catch((err) => console.error('Error al obtener copropietario:', err.message));

    const ctx = document.getElementById('gastosChart') as HTMLCanvasElement | null;
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
          datasets: [
            {
              label: 'Gastos en Bs',
              data: [50, 75, 60, 80, 95, 100, 69],
              backgroundColor: '#C19F66',
              borderRadius: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: 'white',
              },
            },
          },
          scales: {
            x: {
              ticks: { color: 'white' },
            },
            y: {
              ticks: { color: 'white' },
            },
          },
        },
      });
    }
  }, []);

  return (
    <div className="dashboard">
      <div className="left-bar">
        <img
          src="https://cdn-icons-png.flaticon.com/512/107/107831.png"
          alt="Logo"
          className="logo"
        />
        <h1 className="title-text">Bienvenido</h1>

        <nav className="menu-links">
          <a href="/productos">Productos</a>
          <a href="/plandepagos">Plan de Pagos</a>
          <a href="/cajadeahorro">Caja de Ahorro</a>
          <a href="/logout">Cerrar Sesión</a>
        </nav>
      </div>

      <div className="main-content">
        <p id="titulo">Micromarket Edificio La Paz</p>
        <div className="row">
          <div className="info-copropietario carnet-style">
            <h1 className="title-text text-center">Información Personal</h1>
            <div className="carnet-content">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
                alt="Foto Copropietario"
                className="foto-carnet"
              />
              <div className="datos-carnet">
                {copropietario ? (
                  <>
                    <p><strong>Nombre:</strong> {copropietario.nombre}</p>
                    <p><strong>Departamento:</strong> {copropietario.departamento}</p>
                    <p><strong>Email:</strong> {copropietario.email}</p>
                    <p><strong>Teléfono:</strong> {copropietario.telefono}</p>
                    <p><strong>Carnet:</strong> {copropietario.carnet}</p>
                    <p><strong>Estado Cuenta:</strong> {copropietario.estado}</p>
                  </>
                ) : (
                  <p>Cargando información del copropietario...</p>
                )}
              </div>
            </div>
          </div>

          <div className="info-extra text-center">
            <h1 className="title-text">Información Extra</h1>
            <p><strong>Administrador Edificio:</strong> 74456744</p>
            <p><strong>Horario del Micromarket:</strong> 8:00 am - 10:00 pm</p>
            <p><strong>Número Administrador Edificio:</strong> 74456744</p>
            <p><strong>Correo Administrador Edificio:</strong> adminEdificio@gmail.com</p>
          </div>
        </div>

        <div className="grafico-resumen">
          <h2>Gráfico de Gastos</h2>
          <canvas id="gastosChart"></canvas>
        </div>

        <div className="row">
          <div className="gastos-mes">
            <h2>Gastos del Mes</h2>
            <p>0</p>
          </div>
          <div className="compras-mes">
            <h2>Compras del Mes</h2>
            <p>0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardClient;
