export interface CreateTransaction {
  amount: number;
  description?: string;
  type: 'credit' | 'debit';
  status: 'pending' | 'completed' | 'failed';
  walletId: string;
}
