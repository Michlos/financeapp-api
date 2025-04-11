export class UpdateTransactionUseCase {
    constructor(updateTransactionRepository) {
        this.updateTransactionRepository = updateTransactionRepository;
    }

    async execute(transactionId, updateTransactionParams) {
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
