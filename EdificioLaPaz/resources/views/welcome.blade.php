<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Mi Aplicación Vue</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])  <!-- Cargar archivos de Vite -->
</head>
<body>
    <!-- Este es el contenedor donde se montará Vue -->
    <div id="welcome"></div>
</body>
</html>
