import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import StripeCheckout from 'react-stripe-checkout';

const FormularioDePago = () => {
    // Estado del monto del pago
    const [monto, setMonto] = useState(0);

    // Manejador para el botón de pago
    const manejarPago = (token) => {
        // Enviar la información de pago al backend de Flask para procesar el pago
        fetch('/procesar_pago', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ stripeToken: token.id, monto: monto })
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === "success") {
                    // Si el pago se procesó correctamente, hacer algo aquí
                } else {
                    // Si el pago falló, mostrar un mensaje de error
                    alert("Error al procesar el pago: " + data.message);
                }
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            {/* Campo de entrada del monto del pago */}
            <input type="text" value={monto} onChange={(e) => setMonto(e.target.value)} />
            {/* Botón de pago */}
            <StripeCheckout
                stripeKey="sk_test_51Mf8aTJwZ9bnrLE9ecLR2q1QeoFpuh4A8qCTK8GojuhuYZ8FQNsSYmykb2jrcgH8Rznu8tI9GX8op4sILcUkBUoD00BFItNCIy"
                token={manejarPago}
                amount={monto * 100}
                name="Nombre de la empresa"
                description="Descripción del pago"
                currency="USD"
            >
                <Button variant="warning">Pagar</Button>
            </StripeCheckout>
        </div>
    );
}

export default FormularioDePago;