import * as errors from '../../errors/index.js';
export class UpdateTransactionUseCase {
    constructor(updateTransactionRepository, getTransactionByIdRepository) {
        this.updateTransactionRepository = updateTransactionRepository;
        this.getTransactionByIdRepository = getTransactionByIdRepository;
    }

    async execute(transactionId, updateTransactionParams) {
        const transaction =
            await this.getTransactionByIdRepository.execute(transactionId);
        //VERIFICA SE A TRANSACTION EXISTE
        if (!transaction) {
            throw new errors.TransactionNotFoundError(
                updateTransactionParams.transactionId,
            );
        }

        //EXECUTA A ATUALIZAÇÃO
        const updatedTransaction =
            await this.updateTransactionRepository.execute(
                transactionId,
                updateTransactionParams,
            );

        // RETORNA DADOS ATUALIZADOS
        return updatedTransaction;
    }
}
