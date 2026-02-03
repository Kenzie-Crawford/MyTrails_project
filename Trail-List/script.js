const trailForm = document.getElementById('trail-form');
const trailList = document.getElementById('trail-list');
const trailTemplate = document.getElementById('trail-item-template');

const trailNameInput = document.querySelector('#trail-name');
const trailDifficultySelect = document.querySelector('#trail-difficulty');
const trailCategorySelect = document.querySelector('#trail-category');
const dogFriendlyCheckbox = document.querySelector('#dog-friendly');
const wheelchairCheckbox = document.querySelector('#wheelchair-accessible');

const trails = [];

trailNameInput.addEventListener('input', () => {
    if (trailNameInput.value.trim().length < 3) {
        trailNameInput.setCustomValidity('Trail name must be at least 3 characters.');
    } else {
        trailNameInput.setCustomValidity('');
    }
});

trailForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const trailData = {
        name: trailNameInput.value.trim(),
        difficulty: trailDifficultySelect.value,
        category: trailCategorySelect.value,
        dogFriendly: dogFriendlyCheckbox.checked,
        wheelchair: wheelchairCheckbox.checked
    };

    trails.push(trailData);

    alert(`Trail "${trailData.name}" added to your list!`);

    renderTrails();
    trailForm.reset();
});

function renderTrails() {
    if (trailList.firstChild) {
        console.log("First trail in the list:", trailList.firstChild);
        console.log("Last trail in the list:", trailList.lastChild);
    }

    const fragment = document.createDocumentFragment();

    trails.forEach(trail => {
        const clone = trailTemplate.content.cloneNode(true);

        const infoSpan = document.createElement('span');
        infoSpan.classList.add('trail-info');

        const checkboxInfo = [];
        if (trail.dogFriendly) checkboxInfo.push('Dog Friendly');
        if (trail.wheelchair) checkboxInfo.push('Wheelchair Accessible');

        infoSpan.textContent = `${trail.name} (${trail.difficulty}) (${trail.category})` +
                               (checkboxInfo.length ? ` [${checkboxInfo.join(', ')}]` : '');

        infoSpan.addEventListener('mouseover', () => infoSpan.classList.add('highlight'));
        infoSpan.addEventListener('mouseout', () => infoSpan.classList.remove('highlight'));

        clone.querySelector('.trail-item').prepend(infoSpan);

        const deleteButton = clone.querySelector('.delete-btn');
        deleteButton.addEventListener('click', () => {
            const index = trails.indexOf(trail);
            if (index > -1) {
                
                if (confirm(`Delete trail "${trail.name}"?`)) {
                    trails.splice(index, 1);
                    renderTrails();
                }
            }
        });

        fragment.appendChild(clone);
    });

    trailList.innerHTML = '';
    trailList.appendChild(fragment);
}
