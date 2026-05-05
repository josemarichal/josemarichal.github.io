document.addEventListener('DOMContentLoaded', async () => {
    const searchBtn = document.getElementById('search-btn');
    const projectDesc = document.getElementById('project-description');
    const resultsSection = document.getElementById('results-section');
    const resultsGrid = document.getElementById('results-grid');

    let fuse = null;

    // The API database is now loaded globally via api_db.js as `apiData`
    if (typeof apiData !== 'undefined' && apiData.length > 0) {
        // Configure Fuse for fuzzy search
        const options = {
            includeScore: true,
            threshold: 0.4,
            keys: [
                { name: 'description', weight: 0.6 },
                { name: 'category', weight: 0.3 },
                { name: 'name', weight: 0.1 }
            ]
        };
        fuse = new Fuse(apiData, options);
    } else {
        console.error("Failed to load apiData from api_db.js");
        searchBtn.textContent = "Error loading APIs";
        searchBtn.disabled = true;
    }

    // Function to extract keywords from user description
    // This removes common stop words to improve fuzzy search
    function extractKeywords(text) {
        const stopWords = ['i', 'want', 'to', 'build', 'a', 'an', 'the', 'that', 'also', 'shows', 'needs', 'is', 'are', 'for', 'with', 'and', 'or', 'of', 'in', 'on', 'app', 'website', 'project', 'like'];
        let words = text.toLowerCase().replace(/[.,!?;:()]/g, '').split(/\s+/);
        words = words.filter(word => !stopWords.includes(word) && word.length > 2);
        return words.join(' ');
    }

    searchBtn.addEventListener('click', () => {
        if (!fuse) return;
        
        const rawText = projectDesc.value.trim();
        if (!rawText) return;
        
        const query = extractKeywords(rawText);
        
        // Perform search
        // If the extracted query is empty (e.g. they only typed stop words), use the raw text
        const finalQuery = query.length > 0 ? query : rawText;
        
        const results = fuse.search(finalQuery);
        
        // Render top 9 results
        renderResults(results.slice(0, 9));
    });

    function renderResults(results) {
        resultsGrid.innerHTML = '';
        
        if (results.length === 0) {
            resultsGrid.innerHTML = '<p>No APIs found matching your description. Try using different keywords!</p>';
        } else {
            results.forEach(result => {
                const api = result.item;
                const card = document.createElement('div');
                card.className = 'api-card';
                
                const authHtml = api.auth !== 'No' ? `<span class="pill-tag auth-tag">Auth: ${api.auth}</span>` : '';
                const httpsHtml = api.https === 'Yes' ? '🔒 HTTPS' : '🔓 HTTP';
                
                card.innerHTML = `
                    <h3><a href="${api.link}" target="_blank" rel="noopener noreferrer">${api.name}</a></h3>
                    <span class="category">${api.category}</span>
                    <p>${api.description}</p>
                    <div class="meta">
                        ${authHtml}
                        <span>${httpsHtml}</span>
                        <span>CORS: ${api.cors}</span>
                    </div>
                `;
                resultsGrid.appendChild(card);
            });
        }
        
        resultsSection.style.display = 'block';
        
        // Smooth scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
});
