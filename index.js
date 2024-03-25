// Function to fetch exercises from the API
function fetchExercises() {
    return fetch('http://localhost:3000/exercises')
        .then(response => response.json())
        .catch(error => console.error('Error fetching exercises:', error));
}

// Function to display exercises on the page
function displayExercises(exercises) {
    const exerciseList = document.getElementById('exerciseList');
    exerciseList.innerHTML = '';

    exercises.forEach(exercise => {
        const exerciseItem = document.createElement('div');
        exerciseItem.classList.add('exercise-item');
        exerciseItem.innerHTML = `
            <h2>${exercise.name}</h2>
            <p><strong>Category:</strong> ${exercise.category}</p>
            <p><strong>Difficulty Level:</strong> ${exercise.difficultyLevel}</p>
            <p><strong>Calories Burned (per hour):</strong> ${exercise.caloriesBurned}</p>
        `;
        exerciseList.appendChild(exerciseItem);
    });
}

// Event listener for select change
const exerciseCategorySelect = document.getElementById('exerciseCategory');
exerciseCategorySelect.addEventListener('change', () => {
    const selectedCategory = exerciseCategorySelect.value;
    fetchExercises()
        .then(exercises => {
            if (selectedCategory === 'All') {
                displayExercises(exercises);
            } else {
                const filteredExercises = exercises.filter(exercise => exercise.category === selectedCategory);
                displayExercises(filteredExercises);
            }
        });
});

// Event listener for button click (refresh)
const refreshButton = document.getElementById('refreshButton');
refreshButton.addEventListener('click', () => {
    fetchExercises()
        .then(exercises => displayExercises(exercises));
});

// Event listener for input change (search)
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', () => {
    const searchText = searchInput.value.toLowerCase();
    fetchExercises()
        .then(exercises => {
            const filteredExercises = exercises.filter(exercise => exercise.name.toLowerCase().includes(searchText));
            displayExercises(filteredExercises);
        });
});

// Initial fetch and display of exercises
fetchExercises()
    .then(exercises => displayExercises(exercises));
