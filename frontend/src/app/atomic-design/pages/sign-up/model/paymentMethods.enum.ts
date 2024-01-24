export enum PaymentMethods {
  DebitCreditCard = 'DebitCreditCard',
  Cash = 'Cash',
  BankTransfer = 'BankTransfer',
  Paypal = 'Paypal',
  Paysera = 'Paysera',
  Other = 'Other',
}

export namespace PaymentMethods {
  export function getDefinedMethods(): PaymentMethods[] {
    return [
      PaymentMethods.DebitCreditCard,
      PaymentMethods.Cash,
      PaymentMethods.BankTransfer,
      PaymentMethods.Other
    ];
  }

  export function convertFromApiValue(value: string): PaymentMethods {
    switch (value) {
      case 'Paysera':
        return PaymentMethods.Paysera;
      case 'Paypal':
        return PaymentMethods.Paypal;
      case 'Cash':
        return PaymentMethods.Cash;
      case 'BankTransfer':
        return PaymentMethods.BankTransfer;
      case 'DebitCreditCard':
        return PaymentMethods.DebitCreditCard;
      case 'Other':
        return PaymentMethods.Other;
      default:
        return PaymentMethods.Other;
    }
  }

  export function convertToApiValue(value: PaymentMethods): string {
    switch (value) {
      case PaymentMethods.Paysera:
        return 'Paysera';
      case PaymentMethods.Paypal:
        return 'Paypal';
      case PaymentMethods.Cash:
        return 'Cash';
      case PaymentMethods.BankTransfer:
        return 'BankTransfer';
      case PaymentMethods.DebitCreditCard:
        return 'DebitCreditCard';
      case PaymentMethods.Other:
        return 'Other';
      default:
        return 'Other';
    }
  }

  export function toString(payment: PaymentMethods): string {
    switch (payment) {
      case PaymentMethods.DebitCreditCard:
        return $localize`Credit & Debit Card`;
      case PaymentMethods.Cash:
        return $localize`Cash`;
      case PaymentMethods.BankTransfer:
        return $localize`Bank Transfer`;
      case PaymentMethods.Other:
        return $localize`Other`;
      case PaymentMethods.Paypal:
        return $localize`Paypal Account`;
      case PaymentMethods.Paysera:
        return $localize`Paysera Account`;

      default:
        return $localize`Other`;
    }
  }
}
