document.addEventListener('DOMContentLoaded', () => {
    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked tab and target content
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Routine Generator Data
    const exercises = [
        { title: "Spider Walk", category: "Warm-Up", type: "exercise", yt: "https://www.youtube.com/results?search_query=guitar+spider+walk+exercise" },
        { title: "3-Note Per String Scales", category: "Warm-Up", type: "exercise", yt: "https://www.youtube.com/results?search_query=guitar+3+note+per+string+scales+exercise" },
        { title: "Minor Pentatonic Scale", category: "Scales", type: "exercise", yt: "https://www.youtube.com/results?search_query=guitar+minor+pentatonic+scale+exercise" },
        { title: "Open Major Scales", category: "Scales", type: "exercise", yt: "https://www.youtube.com/results?search_query=guitar+open+major+scales+exercise" },
        { title: "Melodic Patterns", category: "Soloing", type: "exercise", yt: "https://www.youtube.com/results?search_query=guitar+melodic+patterns+soloing+exercise" },
        { title: "2-Note Per String Alternate Picking", category: "Warm-Up", type: "exercise", yt: "https://www.youtube.com/results?search_query=guitar+2+note+per+string+alternate+picking" },
        { title: "Legato Control", category: "Warm-Up", type: "exercise", yt: "https://www.youtube.com/results?search_query=guitar+legato+control+exercise" }
    ];

    const concepts = [
        { title: "Metronome Practice", category: "Rhythm", type: "concept", yt: "https://www.youtube.com/results?search_query=guitar+metronome+practice+routine" },
        { title: "Map Out the Fretboard", category: "Fretboard", type: "concept", yt: "https://www.youtube.com/results?search_query=how+to+map+out+the+guitar+fretboard" },
        { title: "The CAGED System", category: "Chords", type: "concept", yt: "https://www.youtube.com/results?search_query=guitar+CAGED+system+explained" },
        { title: "Sing What You Play", category: "Soloing", type: "concept", yt: "https://www.youtube.com/results?search_query=guitar+sing+what+you+play+improvisation" },
        { title: "Mixing Major & Minor Pentatonic", category: "Soloing", type: "concept", yt: "https://www.youtube.com/results?search_query=guitar+mixing+major+and+minor+pentatonic" },
        { title: "Harmonizing Scales", category: "Theory", type: "concept", yt: "https://www.youtube.com/results?search_query=guitar+harmonizing+scales+theory" },
        { title: "Basic Music Theory (Triads & 7ths)", category: "Theory", type: "concept", yt: "https://www.youtube.com/results?search_query=guitar+basic+music+theory+triads+7ths" },
        { title: "Learn the Whole Song", category: "Repertoire", type: "concept", yt: "https://www.youtube.com/results?search_query=how+to+learn+full+songs+on+guitar" },
        { title: "Learn Kid Songs", category: "Repertoire", type: "concept", yt: "https://www.youtube.com/results?search_query=guitar+easy+kid+songs+fingerstyle" },
        { title: "Gear Philosophy", category: "Repertoire", type: "concept", yt: "https://www.youtube.com/results?search_query=does+guitar+gear+matter" },
        { title: "End With Improvisation", category: "Soloing", type: "concept", yt: "https://www.youtube.com/results?search_query=guitar+improvisation+practice" },
        { title: "The 4-Block Practice Habit", category: "Mindset", type: "concept", yt: "https://www.youtube.com/results?search_query=guitar+practice+routine+blocks" }
    ];

    // Modal elements
    const modal = document.getElementById('routine-modal');
    const closeBtn = document.querySelector('.close-btn');
    const generateBtn = document.getElementById('generate-btn');
    const regenerateBtn = document.getElementById('regenerate-btn');
    const routineOutput = document.getElementById('routine-output');

    const generateRoutine = () => {
        // Pick 2 random exercises and 1 random concept
        const shuffledExercises = [...exercises].sort(() => 0.5 - Math.random());
        const shuffledConcepts = [...concepts].sort(() => 0.5 - Math.random());
        
        const selectedExercises = shuffledExercises.slice(0, 2);
        const selectedConcept = shuffledConcepts[0];

        let html = '';
        
        // Render Exercises
        selectedExercises.forEach((ex, index) => {
            html += `
                <div class="routine-item">
                    <h4><i class="fa-solid fa-guitar"></i> Drill ${index + 1}: ${ex.title}</h4>
                    <p>Category: ${ex.category} | <a href="${ex.yt}" target="_blank" style="color:#ff4444;text-decoration:none;"><i class="fa-brands fa-youtube"></i> Search</a></p>
                </div>
            `;
        });

        // Render Concept
        html += `
            <div class="routine-item concept-item">
                <h4><i class="fa-solid fa-lightbulb"></i> Focus Concept: ${selectedConcept.title}</h4>
                <p>Category: ${selectedConcept.category} | <a href="${selectedConcept.yt}" target="_blank" style="color:#ff4444;text-decoration:none;"><i class="fa-brands fa-youtube"></i> Search</a></p>
            </div>
        `;

        routineOutput.innerHTML = html;
        modal.classList.add('show');
    };

    generateBtn.addEventListener('click', generateRoutine);
    regenerateBtn.addEventListener('click', generateRoutine);

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
});
