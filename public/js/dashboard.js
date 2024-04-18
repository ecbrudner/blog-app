document.addEventListener('DOMContentLoaded', () => {
//create
const createFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    if (title && content) {
        const response = await fetch('/api/post/', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dash');
        } else {
            alert(response.statusText);
        }
    }
};


//update
const updateFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
    const id = document.querySelector('#post-id').value;

    if (title && content) {
        const response = await fetch(`/api/post/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dash');
        } else {
            alert(response.statusText);
        }
    }
};


//delete
const deleteButtonHandler = async (event) => {
    event.preventDefault();
    const id = document.querySelector('#post-id').value;
    const response = await fetch(`/api/post/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        document.location.replace('/dash');
    } else {
        alert(response.statusText);
    }
};

const postForm = document.querySelector('.post-form');
const editForm = document.querySelector('.edit-form');
const deleteButton = document.querySelector('.delete');

if (postForm) {
    postForm.addEventListener('submit', createFormHandler);
}

if (editForm) {
    editForm.addEventListener('submit', updateFormHandler);
}

if (deleteButton) {
    deleteButton.addEventListener('click', deleteButtonHandler);
}

});
