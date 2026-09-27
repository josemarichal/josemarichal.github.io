package com.example.nyttop100tvshows.data

import android.content.Context
import android.content.SharedPreferences
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

data class TvShow(
    val rank: Int,
    val title: String,
    val years: String,
    val isSeen: Boolean = false,
    val wantToSee: Boolean = false
)

interface DataRepository {
    val shows: StateFlow<List<TvShow>>
    fun markAsSeen(rank: Int, seen: Boolean)
    fun markWantToSee(rank: Int, want: Boolean)
    fun resetAll()
}

class DefaultDataRepository(context: Context? = null) : DataRepository {
    private val prefs: SharedPreferences? = context?.getSharedPreferences("nyt_tv_prefs", Context.MODE_PRIVATE)

    private val initialShows: List<TvShow> = TvShowsList.shows.map { show ->
        val seen = prefs?.getBoolean("seen_${show.rank}", false) ?: false
        val want = prefs?.getBoolean("want_${show.rank}", false) ?: false
        show.copy(isSeen = seen, wantToSee = want)
    }

    private val _shows = MutableStateFlow(initialShows)
    override val shows: StateFlow<List<TvShow>> = _shows.asStateFlow()

    override fun markAsSeen(rank: Int, seen: Boolean) {
        prefs?.edit()?.putBoolean("seen_$rank", seen)?.apply()
        _shows.value = _shows.value.map {
            if (it.rank == rank) it.copy(isSeen = seen) else it
        }
    }

    override fun markWantToSee(rank: Int, want: Boolean) {
        prefs?.edit()?.putBoolean("want_$rank", want)?.apply()
        _shows.value = _shows.value.map {
            if (it.rank == rank) it.copy(wantToSee = want) else it
        }
    }

    override fun resetAll() {
        prefs?.edit()?.clear()?.apply()
        _shows.value = TvShowsList.shows
    }
}

object TvShowsList {
    val shows = listOf(
        TvShow(1, "Breaking Bad", "2008-2013"),
        TvShow(2, "The Wire", "2002-2008"),
        TvShow(3, "Mad Men", "2007-2015"),
        TvShow(4, "Succession", "2018-2023"),
        TvShow(5, "Fleabag", "2016-2019"),
        TvShow(6, "Game of Thrones", "2011-2019"),
        TvShow(7, "Veep", "2012-2019"),
        TvShow(8, "30 Rock", "2006-2013"),
        TvShow(9, "Curb Your Enthusiasm", "2000-2024"),
        TvShow(10, "Atlanta", "2016-2022"),
        TvShow(11, "The Office (U.S.)", "2005-2013"),
        TvShow(12, "Arrested Development", "2003-2019"),
        TvShow(13, "Girls", "2012-2017"),
        TvShow(14, "Friday Night Lights", "2006-2011"),
        TvShow(15, "Six Feet Under", "2001-2005"),
        TvShow(16, "The Office (U.K.)", "2001-2003"),
        TvShow(17, "The Americans", "2013-2018"),
        TvShow(18, "I May Destroy You", "2020"),
        TvShow(19, "Chernobyl", "2019"),
        TvShow(20, "The Crown", "2016-2023"),
        TvShow(21, "The White Lotus", "2021-present"),
        TvShow(22, "Lost", "2004-2010"),
        TvShow(23, "The Comeback", "2005-2026"),
        TvShow(24, "Deadwood", "2004-2006"),
        TvShow(25, "The Leftovers", "2014-2017"),
        TvShow(26, "Black Mirror", "2011-present"),
        TvShow(27, "Better Call Saul", "2015-2022"),
        TvShow(28, "Band of Brothers", "2001"),
        TvShow(29, "Key & Peele", "2012-2015"),
        TvShow(30, "Severance", "2022-present"),
        TvShow(31, "Survivor", "2000-present"),
        TvShow(32, "Andor", "2022-2025"),
        TvShow(33, "Enlightened", "2011-2013"),
        TvShow(34, "Schitt's Creek", "2015-2020"),
        TvShow(35, "True Detective (Season 1)", "2014"),
        TvShow(36, "The Pitt", "2025-present"),
        TvShow(37, "Battlestar Galactica", "2005-2009"),
        TvShow(38, "Homeland", "2011-2020"),
        TvShow(39, "Watchmen", "2019"),
        TvShow(40, "Adolescence", "2025"),
        TvShow(41, "Louie", "2010-2015"),
        TvShow(42, "Hacks", "2021-2026"),
        TvShow(43, "Peaky Blinders", "2013-2022"),
        TvShow(44, "BoJack Horseman", "2014-2020"),
        TvShow(45, "Happy Valley", "2014-2023"),
        TvShow(46, "Broad City", "2014-2019"),
        TvShow(47, "Twin Peaks: The Return", "2017"),
        TvShow(48, "House of Cards", "2013-2018"),
        TvShow(49, "Normal People", "2020"),
        TvShow(50, "Parks and Recreation", "2009-2015"),
        TvShow(51, "The Good Place", "2016-2020"),
        TvShow(52, "Downton Abbey", "2010-2015"),
        TvShow(53, "Stranger Things", "2016-2025"),
        TvShow(54, "The Bureau", "2015-2020"),
        TvShow(55, "Insecure", "2016-2021"),
        TvShow(56, "Nathan for You", "2013-2017"),
        TvShow(57, "I Think You Should Leave", "2019-present"),
        TvShow(58, "Chappelle's Show", "2003-2006"),
        TvShow(59, "PEN15", "2019-2021"),
        TvShow(60, "Peep Show", "2003-2015"),
        TvShow(61, "RuPaul's Drag Race", "2009-present"),
        TvShow(62, "Slow Horses", "2022-present"),
        TvShow(63, "The Thick of It", "2005-2012"),
        TvShow(64, "Anthony Bourdain: Parts Unknown", "2013-2018"),
        TvShow(65, "Mare of Easttown", "2021"),
        TvShow(66, "The Rehearsal", "2022-present"),
        TvShow(67, "The Handmaid's Tale", "2017-2025"),
        TvShow(68, "Ozark", "2017-2022"),
        TvShow(69, "Anthony Bourdain: No Reservations", "2005-2012"),
        TvShow(70, "The Shield", "2002-2008"),
        TvShow(71, "Beef (Season 1)", "2023"),
        TvShow(72, "Squid Game", "2021-2025"),
        TvShow(73, "Barry", "2018-2023"),
        TvShow(74, "The Bear", "2022-2026"),
        TvShow(75, "Ted Lasso", "2020-present"),
        TvShow(76, "Somebody Somewhere", "2022-2024"),
        TvShow(77, "Modern Family", "2009-2020"),
        TvShow(78, "It's Always Sunny in Philadelphia", "2005-present"),
        TvShow(79, "The Good Wife", "2009-2016"),
        TvShow(80, "How To With John Wilson", "2020-2023"),
        TvShow(81, "The Queen's Gambit", "2020"),
        TvShow(82, "Better Things", "2016-2022"),
        TvShow(83, "Justified", "2010-2015"),
        TvShow(84, "Planet Earth", "2006"),
        TvShow(85, "The Great British Baking Show", "2010-present"),
        TvShow(86, "Shogun", "2024-present"),
        TvShow(87, "Reservation Dogs", "2021-2023"),
        TvShow(88, "Dexter", "2006-2013"),
        TvShow(89, "Baby Reindeer", "2024"),
        TvShow(90, "Eastbound & Down", "2009-2013"),
        TvShow(91, "Catastrophe", "2015-2019"),
        TvShow(92, "The Night Of", "2016"),
        TvShow(93, "Station Eleven", "2021-2022"),
        TvShow(94, "The Diplomat", "2023-present"),
        TvShow(95, "House", "2004-2012"),
        TvShow(96, "Halt and Catch Fire", "2014-2017"),
        TvShow(97, "Community", "2009-2015"),
        TvShow(98, "The OA", "2016-2019"),
        TvShow(99, "Gilmore Girls", "2000-2007"),
        TvShow(100, "Scandal", "2012-2018")
    )
}
