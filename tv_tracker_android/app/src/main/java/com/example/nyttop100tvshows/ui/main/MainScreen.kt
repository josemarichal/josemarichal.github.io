package com.example.nyttop100tvshows.ui.main

import androidx.compose.animation.AnimatedContent
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.slideInHorizontally
import androidx.compose.animation.slideOutHorizontally
import androidx.compose.animation.togetherWith
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.ArrowForward
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.FavoriteBorder
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Checkbox
import androidx.compose.material3.CheckboxDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FilterChip
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Tab
import androidx.compose.material3.TabRow
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.nyttop100tvshows.data.DefaultDataRepository
import com.example.nyttop100tvshows.data.TvShow

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainScreen(
    modifier: Modifier = Modifier,
    viewModel: MainScreenViewModel = run {
        val context = LocalContext.current
        viewModel(factory = MainScreenViewModel.provideFactory(DefaultDataRepository(context)))
    }
) {
    val state by viewModel.uiState.collectAsStateWithLifecycle()

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Column {
                        Text(
                            text = "The 100 Best TV Shows",
                            style = MaterialTheme.typography.titleLarge.copy(
                                fontWeight = FontWeight.Bold,
                                fontFamily = FontFamily.Serif
                            )
                        )
                        Text(
                            text = "The New York Times • 21st Century",
                            style = MaterialTheme.typography.labelSmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                },
                actions = {
                    IconButton(onClick = { viewModel.resetAll() }) {
                        Icon(
                            imageVector = Icons.Default.Refresh,
                            contentDescription = "Reset checklist"
                        )
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.surface
                )
            )
        },
        modifier = modifier
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
        ) {
            // Header Progress Bar
            ProgressBarSection(
                seenCount = state.seenCount,
                totalCount = state.totalCount,
                wantCount = state.wantCount,
                progress = state.progress
            )

            // Mode Selector Tabs (Interactive Deck vs Full List)
            TabRow(
                selectedTabIndex = if (state.mode == AppMode.CARD_INTERACTIVE) 0 else 1,
                containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f)
            ) {
                Tab(
                    selected = state.mode == AppMode.CARD_INTERACTIVE,
                    onClick = { viewModel.setMode(AppMode.CARD_INTERACTIVE) },
                    text = {
                        Text(
                            "🎴 Deck Mode (${state.unseenShows.size})",
                            fontWeight = FontWeight.SemiBold
                        )
                    }
                )
                Tab(
                    selected = state.mode == AppMode.CHECKLIST,
                    onClick = { viewModel.setMode(AppMode.CHECKLIST) },
                    text = {
                        Text(
                            "📋 Checklist (${state.allShows.size})",
                            fontWeight = FontWeight.SemiBold
                        )
                    }
                )
            }

            // Mode Content
            AnimatedContent(
                targetState = state.mode,
                label = "mode_transition"
            ) { activeMode ->
                when (activeMode) {
                    AppMode.CARD_INTERACTIVE -> {
                        CardInteractiveView(
                            state = state,
                            onSeen = { viewModel.markSeenCurrentShow() },
                            onWant = { viewModel.markWantToSeeCurrentShow() },
                            onSkip = { viewModel.skipCurrentShow() },
                            onPrev = { viewModel.previousCard() },
                            onNext = { viewModel.nextCard() },
                            onSwitchToList = { viewModel.setMode(AppMode.CHECKLIST) },
                            onReset = { viewModel.resetAll() }
                        )
                    }
                    AppMode.CHECKLIST -> {
                        ChecklistModeView(
                            state = state,
                            onToggleSeen = { viewModel.toggleSeen(it) },
                            onToggleWant = { viewModel.toggleWantToSee(it) },
                            onFilterChange = { viewModel.setFilter(it) },
                            onSearchChange = { viewModel.setSearchQuery(it) }
                        )
                    }
                }
            }
        }
    }
}

@Composable
fun ProgressBarSection(
    seenCount: Int,
    totalCount: Int,
    wantCount: Int,
    progress: Float
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 20.dp, vertical = 12.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "$seenCount of $totalCount Seen (${(progress * 100).toInt()}%)",
                style = MaterialTheme.typography.bodyMedium,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.primary
            )
            Text(
                text = "${totalCount - seenCount} Remaining • $wantCount Watchlist",
                style = MaterialTheme.typography.labelMedium,
                color = MaterialTheme.colorScheme.outline
            )
        }
        Spacer(modifier = Modifier.height(6.dp))
        LinearProgressIndicator(
            progress = { progress },
            modifier = Modifier
                .fillMaxWidth()
                .height(8.dp)
                .clip(RoundedCornerShape(4.dp))
        )
    }
}

@Composable
fun CardInteractiveView(
    state: MainUiState,
    onSeen: () -> Unit,
    onWant: () -> Unit,
    onSkip: () -> Unit,
    onPrev: () -> Unit,
    onNext: () -> Unit,
    onSwitchToList: () -> Unit,
    onReset: () -> Unit
) {
    val currentShow = state.currentShow

    if (currentShow == null || state.unseenShows.isEmpty()) {
        // All shows reviewed / checked!
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(24.dp),
            contentAlignment = Alignment.Center
        ) {
            Card(
                colors = CardDefaults.cardColors(
                    containerColor = MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.4f)
                ),
                shape = RoundedCornerShape(24.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(
                    modifier = Modifier.padding(32.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(text = "🎉", fontSize = 48.sp)
                    Spacer(modifier = Modifier.height(12.dp))
                    Text(
                        text = "You've Completed the List!",
                        style = MaterialTheme.typography.headlineSmall.copy(
                            fontFamily = FontFamily.Serif,
                            fontWeight = FontWeight.Bold
                        ),
                        textAlign = TextAlign.Center
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "You have marked all ${state.seenCount} shows as seen. No shows left in your unseen deck.",
                        style = MaterialTheme.typography.bodyMedium,
                        textAlign = TextAlign.Center,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                    Spacer(modifier = Modifier.height(24.dp))
                    Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                        OutlinedButton(onClick = onReset) {
                            Text("Reset All")
                        }
                        Button(onClick = onSwitchToList) {
                            Text("View All Shows")
                        }
                    }
                }
            }
        }
    } else {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(20.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.SpaceBetween
        ) {
            // Deck Progress Pill
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Surface(
                    color = MaterialTheme.colorScheme.secondaryContainer,
                    shape = RoundedCornerShape(16.dp)
                ) {
                    Text(
                        text = "Card ${state.currentCardPosition} of ${state.unseenShows.size} remaining",
                        modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp),
                        style = MaterialTheme.typography.labelMedium,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.onSecondaryContainer
                    )
                }

                Text(
                    text = "Rank #${currentShow.rank} of 100",
                    style = MaterialTheme.typography.labelMedium,
                    fontWeight = FontWeight.SemiBold,
                    color = MaterialTheme.colorScheme.primary
                )
            }

            Spacer(modifier = Modifier.height(16.dp))

            // Main Interactive Show Card
            AnimatedContent(
                targetState = currentShow,
                transitionSpec = {
                    (slideInHorizontally { width -> width } + fadeIn()).togetherWith(
                        slideOutHorizontally { width -> -width } + fadeOut()
                    )
                },
                label = "show_card_animation"
            ) { show ->
                Card(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 4.dp),
                    shape = RoundedCornerShape(24.dp),
                    elevation = CardDefaults.cardElevation(defaultElevation = 6.dp),
                    colors = CardDefaults.cardColors(
                        containerColor = MaterialTheme.colorScheme.surface
                    )
                ) {
                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(28.dp),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        // NYT Rank Badge
                        Box(
                            modifier = Modifier
                                .size(56.dp)
                                .clip(CircleShape)
                                .background(MaterialTheme.colorScheme.primaryContainer),
                            contentAlignment = Alignment.Center
                        ) {
                            Text(
                                text = "#${show.rank}",
                                style = MaterialTheme.typography.titleMedium.copy(
                                    fontWeight = FontWeight.Bold,
                                    fontFamily = FontFamily.Serif
                                ),
                                color = MaterialTheme.colorScheme.onPrimaryContainer
                            )
                        }

                        Spacer(modifier = Modifier.height(20.dp))

                        // Show Title
                        Text(
                            text = show.title,
                            style = MaterialTheme.typography.headlineMedium.copy(
                                fontWeight = FontWeight.Bold,
                                fontFamily = FontFamily.Serif
                            ),
                            textAlign = TextAlign.Center,
                            color = MaterialTheme.colorScheme.onSurface
                        )

                        Spacer(modifier = Modifier.height(8.dp))

                        // Broadcast Years
                        Surface(
                            shape = RoundedCornerShape(8.dp),
                            color = MaterialTheme.colorScheme.surfaceVariant
                        ) {
                            Text(
                                text = show.years,
                                modifier = Modifier.padding(horizontal = 10.dp, vertical = 4.dp),
                                style = MaterialTheme.typography.labelMedium,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                        }

                        Spacer(modifier = Modifier.height(32.dp))

                        // The Question
                        Text(
                            text = "Have you seen it?",
                            style = MaterialTheme.typography.titleLarge.copy(
                                fontWeight = FontWeight.Medium,
                                fontFamily = FontFamily.Serif
                            ),
                            color = MaterialTheme.colorScheme.primary
                        )

                        Spacer(modifier = Modifier.height(24.dp))

                        // Primary Action: YES, I'VE SEEN IT (Removes from list!)
                        Button(
                            onClick = onSeen,
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(56.dp),
                            colors = ButtonDefaults.buttonColors(
                                containerColor = Color(0xFF1B5E20) // Forest Green
                            ),
                            shape = RoundedCornerShape(16.dp)
                        ) {
                            Icon(Icons.Default.Check, contentDescription = null)
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                text = "YES, I'VE SEEN IT",
                                fontWeight = FontWeight.Bold,
                                fontSize = 16.sp
                            )
                        }

                        Spacer(modifier = Modifier.height(12.dp))

                        // Secondary Action: I WANT TO SEE IT
                        OutlinedButton(
                            onClick = onWant,
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(48.dp),
                            shape = RoundedCornerShape(16.dp)
                        ) {
                            Icon(
                                imageVector = if (show.wantToSee) Icons.Default.Favorite else Icons.Default.FavoriteBorder,
                                contentDescription = null,
                                tint = if (show.wantToSee) Color.Red else MaterialTheme.colorScheme.primary
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                text = if (show.wantToSee) "SAVED TO WATCHLIST" else "I WANT TO SEE IT",
                                fontWeight = FontWeight.SemiBold
                            )
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(16.dp))

            // Navigation Controls (Skip, Prev, Next)
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                IconButton(onClick = onPrev) {
                    Icon(Icons.Default.ArrowBack, contentDescription = "Previous show")
                }

                OutlinedButton(
                    onClick = onSkip,
                    shape = RoundedCornerShape(12.dp)
                ) {
                    Text("Skip for Now")
                    Spacer(modifier = Modifier.width(4.dp))
                    Icon(Icons.Default.ArrowForward, contentDescription = null, modifier = Modifier.size(16.dp))
                }

                IconButton(onClick = onNext) {
                    Icon(Icons.Default.ArrowForward, contentDescription = "Next show")
                }
            }
        }
    }
}

@Composable
fun ChecklistModeView(
    state: MainUiState,
    onToggleSeen: (TvShow) -> Unit,
    onToggleWant: (TvShow) -> Unit,
    onFilterChange: (FilterType) -> Unit,
    onSearchChange: (String) -> Unit
) {
    val filteredShows = state.allShows.filter { show ->
        val matchesFilter = when (state.filter) {
            FilterType.REMAINING_UNSEEN -> !show.isSeen
            FilterType.SEEN -> show.isSeen
            FilterType.WANT_TO_SEE -> show.wantToSee
            FilterType.ALL -> true
        }
        val matchesSearch = state.searchQuery.isBlank() ||
                show.title.contains(state.searchQuery, ignoreCase = true) ||
                show.rank.toString() == state.searchQuery.trim()

        matchesFilter && matchesSearch
    }

    Column(modifier = Modifier.fillMaxSize()) {
        // Search bar
        OutlinedTextField(
            value = state.searchQuery,
            onValueChange = onSearchChange,
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp, vertical = 8.dp),
            placeholder = { Text("Search by title or rank...") },
            leadingIcon = { Icon(Icons.Default.Search, contentDescription = null) },
            singleLine = true,
            shape = RoundedCornerShape(12.dp)
        )

        // Filter chips
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp, vertical = 4.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            FilterChip(
                selected = state.filter == FilterType.REMAINING_UNSEEN,
                onClick = { onFilterChange(FilterType.REMAINING_UNSEEN) },
                label = { Text("Unseen (${state.totalCount - state.seenCount})") }
            )
            FilterChip(
                selected = state.filter == FilterType.SEEN,
                onClick = { onFilterChange(FilterType.SEEN) },
                label = { Text("Seen (${state.seenCount})") }
            )
            FilterChip(
                selected = state.filter == FilterType.WANT_TO_SEE,
                onClick = { onFilterChange(FilterType.WANT_TO_SEE) },
                label = { Text("Watchlist (${state.wantCount})") }
            )
            FilterChip(
                selected = state.filter == FilterType.ALL,
                onClick = { onFilterChange(FilterType.ALL) },
                label = { Text("All (100)") }
            )
        }

        // Show List
        if (filteredShows.isEmpty()) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(32.dp),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = if (state.filter == FilterType.REMAINING_UNSEEN)
                        "✨ No remaining unseen shows! You've checked off the entire list."
                    else
                        "No matching shows found.",
                    textAlign = TextAlign.Center,
                    style = MaterialTheme.typography.bodyLarge,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        } else {
            LazyColumn(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(horizontal = 16.dp)
            ) {
                items(filteredShows, key = { it.rank }) { show ->
                    TvShowListItem(
                        show = show,
                        onToggleSeen = { onToggleSeen(show) },
                        onToggleWant = { onToggleWant(show) }
                    )
                }
            }
        }
    }
}

@Composable
fun TvShowListItem(
    show: TvShow,
    onToggleSeen: () -> Unit,
    onToggleWant: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 4.dp),
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(
            containerColor = if (show.isSeen)
                MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.4f)
            else
                MaterialTheme.colorScheme.surface
        )
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .clickable { onToggleSeen() }
                .padding(horizontal = 12.dp, vertical = 8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Checkbox: "I've seen it"
            Checkbox(
                checked = show.isSeen,
                onCheckedChange = { onToggleSeen() },
                colors = CheckboxDefaults.colors(
                    checkedColor = Color(0xFF1B5E20)
                )
            )

            // Rank
            Text(
                text = "${show.rank}.",
                fontWeight = FontWeight.Bold,
                fontFamily = FontFamily.Serif,
                modifier = Modifier.width(36.dp),
                color = if (show.isSeen) MaterialTheme.colorScheme.outline else MaterialTheme.colorScheme.primary
            )

            // Title and Years
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = show.title,
                    fontWeight = FontWeight.SemiBold,
                    style = MaterialTheme.typography.bodyLarge,
                    textDecoration = if (show.isSeen) TextDecoration.LineThrough else TextDecoration.None,
                    color = if (show.isSeen) MaterialTheme.colorScheme.outline else MaterialTheme.colorScheme.onSurface
                )
                Text(
                    text = show.years,
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.outline
                )
            }

            // Want to see button
            IconButton(onClick = onToggleWant) {
                Icon(
                    imageVector = if (show.wantToSee) Icons.Default.Favorite else Icons.Default.FavoriteBorder,
                    contentDescription = "Want to see",
                    tint = if (show.wantToSee) Color.Red else MaterialTheme.colorScheme.outline
                )
            }
        }
    }
}
