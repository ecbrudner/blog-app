document.addEventListener('DOMContentLoaded', () => {

const commentFormHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#comment').value.trim();
    const post_id = document.querySelector('#post-id').value;

    if (comment) {
        const response = await fetch(`/api/post/posts/${post_id}/comments`, 
        {
            method: 'POST',
            body: JSON.stringify({ comment_text: comment }),
            headers: { 'Content-Type': 'application/json' },
        });

        console.log ("response", response);

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
};

const commentForm= document.querySelector('.comment-form');

if (commentForm) {
    commentForm.addEventListener('submit', commentFormHandler);
}

});