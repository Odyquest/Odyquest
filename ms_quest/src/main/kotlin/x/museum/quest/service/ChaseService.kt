package x.museum.quest.service

import kotlinx.coroutines.flow.onEach
import kotlinx.coroutines.withTimeout
import mu.KotlinLogging
import org.springframework.context.annotation.Lazy
import org.springframework.data.mongodb.core.*
import org.springframework.data.mongodb.core.ReactiveFluentMongoOperations
import org.springframework.data.mongodb.core.oneAndAwait
import org.springframework.stereotype.Service
import x.museum.quest.entity.Chase
import javax.validation.ConstraintValidatorFactory
import javax.validation.ValidatorFactory

@Service
class ChaseService(
        private val mongo: ReactiveFluentMongoOperations,
        @Lazy private val validatorFactory: ValidatorFactory
) {
    private val validator by lazy { validatorFactory.validator }


    /*******************************************
     *                 CREATE
     *******************************************/

    suspend fun create(chase: Chase): Chase {

        val newChase = chase

        logger.trace { "Create new chase: $chase" }
        return withTimeout(timeoutShort) { mongo.insert<Chase>().oneAndAwait(newChase)}
    }

    /*******************************************
     *                  READ
     *******************************************/

    suspend fun findAll() = withTimeout(timeoutShort) {
        mongo.query<Chase>()
                .flow()
                .onEach { logger.debug { "findAll(): $it" } }
    }

    /*******************************************
     *                 UPDATE
     *******************************************/


    /*******************************************
     *                 DELETE
     *******************************************/

    /*******************************************
     *            Utility Functions
     *******************************************/

    private companion object {
        val logger = KotlinLogging.logger {}

        const val timeoutShort = 500L
        const val timeoutLong = 2000L
    }
}