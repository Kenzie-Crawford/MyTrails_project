const trailform = document.getElementById('trail-form');
const trailList = document.getElementById('trail-list');

const trailNameInput = document.querySelector('#trail-name');
const trailDifficultySelect = document.querySelector('#trail-difficulty');
const trailCategorySelect = document.querySelector('#trail-category');
const dogFriendlyCheckbox = document.querySelector('#dog-friendly');
const wheelchairCheckbox = document.querySelector('#wheelchair-accessible');

trailform.addEventListener('submit', (event) => {
    event.preventDefault();

    const trailData = {
        name: trailNameInput.value.trim(),
        difficulty: trailDifficultySelect.value,
        category: trailCategorySelect.value,
        dogFriendly: dogFriendlyCheckbox.checked,
        wheelchair: wheelchairCheckbox.checked

    };

    const trailItem = createTrailItem(trailData);
    trailList.appendChild(trailItem);

    trailform.reset();
});

function createTrailItem(trail) {
    
    const li = document.createElement('li');
    li.classList.add('trail-item');


    const infoDiv = document.createElement('div');
    infoDiv.classList.add('trail-info');

    const nameSpan = document.createElement('span');
    nameSpan.classList.add('trail-name');
    nameSpan.textContent = trail.name;

    const detailsSpan = document.createElement('span');
    detailsSpan.classList.add('trail-details');
    detailsSpan.textContent = `(${trail.difficulty}) (${trail.category})`;

    
    const checkboxSpan = document.createElement('span');
    checkboxSpan.classList.add('trail-checkbox-info');
    const checkboxInfo = [];
    if (trail.dogFriendly) checkboxInfo.push('Dog Friendly');
    if (trail.wheelchair) checkboxInfo.push('Wheelchair Accessible');
    checkboxSpan.textContent = checkboxInfo.length > 0 ? `[${checkboxInfo.join(', ')}]` : '';

    
    infoDiv.appendChild(nameSpan);
    infoDiv.appendChild(detailsSpan);
    infoDiv.appendChild(checkboxSpan);

   
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete Trail";
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => li.remove());

    // Append info and button to li
    li.appendChild(infoDiv);
    li.appendChild(deleteBtn);

    return li;
}