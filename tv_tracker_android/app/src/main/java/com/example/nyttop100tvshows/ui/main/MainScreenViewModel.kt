package com.example.nyttop100tvshows.ui.main

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.example.nyttop100tvshows.data.DataRepository
import com.example.nyttop100tvshows.data.TvShow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.stateIn

enum class AppMode {
    CARD_INTERACTIVE,
    CHECKLIST
}

enum class FilterType {
    REMAINING_UNSEEN,
    SEEN,
    WANT_TO_SEE,
    ALL
}

data class MainUiState(
    val allShows: List<TvShow> = emptyList(),
    val unseenShows: List<TvShow> = emptyList(),
    val currentShow: TvShow? = null,
    val currentCardPosition: Int = 0,
    val mode: AppMode = AppMode.CARD_INTERACTIVE,
    val filter: FilterType = FilterType.REMAINING_UNSEEN,
    val searchQuery: String = "",
    val seenCount: Int = 0,
    val wantCount: Int = 0,
    val totalCount: Int = 100,
    val progress: Float = 0f
)

class MainScreenViewModel(private val repository: DataRepository) : ViewModel() {

    private val _mode = MutableStateFlow(AppMode.CARD_INTERACTIVE)
    private val _filter = MutableStateFlow(FilterType.REMAINING_UNSEEN)
    private val _searchQuery = MutableStateFlow("")
    private val _cardIndex = MutableStateFlow(0)

    val uiState: StateFlow<MainUiState> = combine(
        repository.shows,
        _mode,
        _filter,
        _searchQuery,
        _cardIndex
    ) { shows, mode, filter, query, cardIndex ->
        val seenCount = shows.count { it.isSeen }
        val wantCount = shows.count { it.wantToSee }
        val unseenShows = shows.filter { !it.isSeen }

        val safeIndex = if (unseenShows.isEmpty()) 0 else (cardIndex.coerceIn(0, (unseenShows.size - 1).coerceAtLeast(0)))
        val currentShow = unseenShows.getOrNull(safeIndex)

        MainUiState(
            allShows = shows,
            unseenShows = unseenShows,
            currentShow = currentShow,
            currentCardPosition = if (unseenShows.isEmpty()) 0 else safeIndex + 1,
            mode = mode,
            filter = filter,
            searchQuery = query,
            seenCount = seenCount,
            wantCount = wantCount,
            totalCount = shows.size,
            progress = if (shows.isNotEmpty()) seenCount.toFloat() / shows.size else 0f
        )
    }.stateIn(
        viewModelScope,
        SharingStarted.WhileSubscribed(5000),
        MainUiState()
    )

    fun markSeenCurrentShow() {
        val current = uiState.value.currentShow ?: return
        repository.markAsSeen(current.rank, true)
        // After removing, stay at current index or clamp
    }

    fun markWantToSeeCurrentShow() {
        val current = uiState.value.currentShow ?: return
        repository.markWantToSee(current.rank, !current.wantToSee)
        nextCard()
    }

    fun skipCurrentShow() {
        nextCard()
    }

    fun previousCard() {
        val count = uiState.value.unseenShows.size
        if (count > 0) {
            _cardIndex.value = (_cardIndex.value - 1 + count) % count
        }
    }

    fun nextCard() {
        val count = uiState.value.unseenShows.size
        if (count > 0) {
            _cardIndex.value = (_cardIndex.value + 1) % count
        }
    }

    fun toggleSeen(show: TvShow) {
        repository.markAsSeen(show.rank, !show.isSeen)
    }

    fun toggleWantToSee(show: TvShow) {
        repository.markWantToSee(show.rank, !show.wantToSee)
    }

    fun setMode(mode: AppMode) {
        _mode.value = mode
    }

    fun setFilter(filter: FilterType) {
        _filter.value = filter
    }

    fun setSearchQuery(query: String) {
        _searchQuery.value = query
    }

    fun resetAll() {
        repository.resetAll()
        _cardIndex.value = 0
    }

    companion object {
        fun provideFactory(repository: DataRepository): ViewModelProvider.Factory =
            object : ViewModelProvider.Factory {
                @Suppress("UNCHECKED_CAST")
                override fun <T : ViewModel> create(modelClass: Class<T>): T {
                    return MainScreenViewModel(repository) as T
                }
            }
    }
}
