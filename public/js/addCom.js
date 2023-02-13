const addComHandler = async(event) => {
    event.preventDefault()


const comment_text = document.querySelector('.addCom').value.trim();
const id = document.querySelector('.btn').getAttribute('data-id')

if (comment_text) {
    const response = await fetch(`/api/posts/addcomment/${id}`, {
      method: 'POST',
      body: JSON.stringify({comment_text}),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(response)

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to add comment');
    }
  }
}

 document
 .querySelector('.addComment')
 .addEventListener('submit', addComHandler)