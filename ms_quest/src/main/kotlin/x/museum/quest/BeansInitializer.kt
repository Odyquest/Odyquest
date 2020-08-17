/*
 * Copyright (C) 2020 - museum x, Karlsruhe
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

package x.museum.quest

import kotlinx.coroutines.InternalCoroutinesApi
import org.springframework.context.ApplicationContextInitializer
import org.springframework.context.support.GenericApplicationContext
import org.springframework.context.support.beans
import x.museum.quest.config.db.customConversions
import x.museum.quest.config.db.generateChaseId
import x.museum.quest.config.db.generateQuestId
import x.museum.quest.config.db.writeConcernResolver
import x.museum.quest.config.security.passwordEncoder


class BeansInitializer : ApplicationContextInitializer<GenericApplicationContext> {
    @InternalCoroutinesApi
    override fun initialize(applicationContext: GenericApplicationContext) = beans.initialize(applicationContext)

}

@InternalCoroutinesApi
val beans = beans {
    bean(::passwordEncoder)
    bean(::customConversions)
    bean(::generateChaseId)
    bean(::generateQuestId)
    bean(::writeConcernResolver)
}