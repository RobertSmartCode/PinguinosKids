import  { useState } from 'react';
import MercadoPagoPayment from './MercadoPagoPayment'; // Importa tus componentes de método de pago
import TransferPayment from './TransferPayment';
import CashPayment from './CashPayment';

const PaymentMethodSelector = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('mercado_pago');

  return (
    <div>
      {/* Selector de método de pago */}
      <div>
        <label>
          <input
            type="radio"
            value="mercado_pago"
            checked={selectedPaymentMethod === 'mercado_pago'}
            onChange={() => setSelectedPaymentMethod('mercado_pago')}
          />
          Mercado Pago
        </label>

        <label>
          <input
            type="radio"
            value="transfer"
            checked={selectedPaymentMethod === 'transfer'}
            onChange={() => setSelectedPaymentMethod('transfer')}
          />
          Transferencia Bancaria
        </label>

        <label>
          <input
            type="radio"
            value="cash"
            checked={selectedPaymentMethod === 'cash'}
            onChange={() => setSelectedPaymentMethod('cash')}
          />
          Pago en Efectivo
        </label>
      </div>

      {/* Renderiza el componente de método de pago según la selección */}
      {selectedPaymentMethod === 'cash' && <CashPayment />}
      {selectedPaymentMethod === 'transfer' && <TransferPayment />}
      {selectedPaymentMethod === 'mercado_pago' && <MercadoPagoPayment />}
    </div>
  );
};

export default PaymentMethodSelector;
