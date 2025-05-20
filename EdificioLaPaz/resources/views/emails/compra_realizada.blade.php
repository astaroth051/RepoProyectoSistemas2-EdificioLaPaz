<h1>Gracias por tu compra en el Micromarket</h1>

<p><strong>Fecha:</strong> {{ $venta['fecha'] }}</p>
<p><strong>Código Ficha:</strong> {{ $venta['codigo_ficha'] }}</p>
<p><strong>Total:</strong> {{ $venta['total'] }} Bs</p>

<h3>Detalle de productos:</h3>
<ul>
    @foreach ($venta['productos'] as $item)
        <li>{{ $item['nombre'] }} - {{ $item['cantidad'] }} unidad{{ $item['cantidad'] > 1 ? 'es' : '' }}</li>
    @endforeach
</ul>
