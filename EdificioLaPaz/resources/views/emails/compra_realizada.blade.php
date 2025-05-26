<div style="min-height:100vh; background: linear-gradient(to bottom right, #fef9c3, #d1fae5, #bfdbfe); padding: 2rem; display: flex; align-items: center; justify-content: center;">
    <div style="max-width: 600px; width: 100%; background-color: #ecfdf5; padding: 24px; border-radius: 1rem; box-shadow: 0 10px 15px rgba(0,0,0,0.1); border: 1px solid #bbf7d0; font-family: sans-serif;">
        <h1 style="font-size: 24px; font-weight: 800; color: #047857; text-align: center; margin-bottom: 1.5rem;">
            🛍️ ¡Gracias por tu compra en el Micromarket!
        </h1>

        <div style="color: #374151; font-size: 16px; margin-bottom: 1.5rem;">
            <p><strong style="color: #065f46;">📅 Fecha:</strong> {{ $venta['fecha'] }}</p>
            <p><strong style="color: #065f46;">🧾 Código Ficha:</strong> {{ $venta['codigo_ficha'] }}</p>
            <p><strong style="color: #065f46;">💵 Total:</strong> {{ $venta['total'] }} Bs</p>
        </div>

        <h3 style="font-size: 18px; font-weight: 600; color: #065f46; border-top: 1px solid #bbf7d0; padding-top: 1rem;">
            🛒 Detalle de productos:
        </h3>
        <ul style="color: #374151; padding-left: 1rem; margin-top: 0.5rem;">
            @foreach ($venta['productos'] as $item)
                <li>
                    {{ $item['nombre'] }} - {{ $item['cantidad'] }} unidad{{ $item['cantidad'] > 1 ? 'es' : '' }}
                </li>
            @endforeach
        </ul>
    </div>
</div>
