import { Injectable } from '@angular/core';
import { CreditCard } from '../models/creditCard';

@Injectable()
export class CreditCardService {
   createCC(creditCard: CreditCard) {
       console.log('Credit Card Number: ' + creditCard.creditCardNumber);
       console.log('Cvc Number: ' + creditCard.cvcNumber);
   }
} 