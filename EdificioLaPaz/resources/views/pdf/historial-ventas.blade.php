<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: sans-serif;
            font-size: 12px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid #444;
            padding: 6px;
            text-align: left;
        }
        th {
            background-color: #eee;
        }
        h2 {
            text-align: center;
        }
    </style>
</head>
<body>
    <h2>Historial de Ventas - Micromarket La Paz</h2>
    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Total (Bs.)</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($ventas as $i => $venta)
                <tr>
                    <td>{{ $i + 1 }}</td>
                    <td>{{ \Carbon\Carbon::parse($venta['fecha'])->format('Y-m-d') }}</td>
                    <td>{{ $venta['cliente'] }}</td>
                    <td>{{ number_format($venta['total'], 2, '.', ',') }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="4" style="text-align: center;">No hay ventas registradas.</td>
                </tr>
            @endforelse
        </tbody>
    </table>
</body>
</html>
