<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class CompraRealizada extends Mailable
{
    use Queueable, SerializesModels;

    public $venta;

    public function __construct($venta)
    {
        $this->venta = $venta;
    }


    public function build()
    {
        return $this->subject('Confirmación de Compra - Micromarket')
            ->view('emails.compra_realizada');
    }
}
