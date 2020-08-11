package x.museum.quest.config.db

import org.springframework.context.annotation.Bean
import org.springframework.data.mongodb.ReactiveMongoDatabaseFactory
import org.springframework.data.mongodb.ReactiveMongoTransactionManager

interface TransactionConfig {
    @Bean
    fun transactionManager(dbFactory: ReactiveMongoDatabaseFactory) = ReactiveMongoTransactionManager(dbFactory)
}