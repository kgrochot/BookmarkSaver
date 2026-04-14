const addBookmarkBtn = document.getElementById('add-bookmark');
const bookmarkList = document.getElementById('bookmark-list');
const bookmarkNameInput = document.getElementById('bookmark-name');
const bookmarkUrlInput = document.getElementById('bookmark-url');

const editModal = document.getElementById('edit-modal');
const editNameInput = document.getElementById('edit-name');
const editUrlInput = document.getElementById('edit-url');
const cancelEditBtn = document.getElementById('cancel-edit');
const saveEditBtn = document.getElementById('save-edit');

let currentEditId = null;

document.addEventListener('DOMContentLoaded', loadBookmarks);



// ========================
// ADD BOOKMARK
// ========================
addBookmarkBtn.addEventListener('click', () => {
    let name = bookmarkNameInput.value.trim();
    let url = bookmarkUrlInput.value.trim();

    if (!name || !url) {
        alert('Please enter both name and URL.');
        return;
    }

    if (!url.startsWith('http')) {
        url = 'https://' + url;
    }

    const bookmark = {
        id: Date.now(),
        name,
        url
    };

    saveBookmark(bookmark);
    addBookmark(bookmark);

    bookmarkNameInput.value = '';
    bookmarkUrlInput.value = '';
});



// ========================
// UI: ADD TO DOM
// ========================
function addBookmark(bookmark) {
    const li = document.createElement('li');

    const link = document.createElement('a');
    link.href = bookmark.url;
    link.textContent = bookmark.name;
    link.target = '_blank';

    const buttonWrapper = document.createElement('div');

    // EDIT BUTTON
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';

    editButton.addEventListener('click', (e) => {
        e.stopPropagation();

        currentEditId = Number(bookmark.id);

        editNameInput.value = bookmark.name;
        editUrlInput.value = bookmark.url;

        editModal.classList.remove('hidden');
    });

    // REMOVE BUTTON
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';

    removeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        removeBookmark(bookmark.id);
        li.remove();
    });

    buttonWrapper.appendChild(editButton);
    buttonWrapper.appendChild(removeButton);

    li.appendChild(link);
    li.appendChild(buttonWrapper);

    bookmarkList.appendChild(li);
}



// ========================
// STORAGE
// ========================
function getBookmarksFromStorage() {
    return JSON.parse(localStorage.getItem('bookmarks')) || [];
}

function saveBookmark(bookmark) {
    const bookmarks = getBookmarksFromStorage();
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

function removeBookmark(id) {
    let bookmarks = getBookmarksFromStorage();
    bookmarks = bookmarks.filter(b => b.id !== id);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

function loadBookmarks() {
    const bookmarks = getBookmarksFromStorage();
    bookmarks.forEach(addBookmark);
}



// ========================
// MODAL (EDIT)
// ========================

// OPEN/CLOSE
cancelEditBtn.addEventListener('click', () => {
    editModal.classList.add('hidden');
});

// SAVE EDIT
saveEditBtn.addEventListener('click', () => {
    let bookmarks = getBookmarksFromStorage();

    let newName = editNameInput.value.trim();
    let newUrl = editUrlInput.value.trim();

    if (!newName || !newUrl) return;

    if (!newUrl.startsWith('http')) {
        newUrl = 'https://' + newUrl;
    }

    bookmarks = bookmarks.map(b => {
        if (Number(b.id) === Number(currentEditId)) {
            return {
                ...b,
                name: newName,
                url: newUrl.startsWith('http') ? newUrl : 'https://' + newUrl
            };
        }
        return b;
    });

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    editModal.classList.add('hidden');

    bookmarkList.innerHTML = '';
    loadBookmarks();
});