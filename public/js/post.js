const newFormHandler = async(event) => {
    event.preventDefault()
}

const title = document.querySelector('#post-title').value.trim();
const post = document.querySelector('#post-content').value.trim();
//const description = document.querySelector('#post-comment').value.trim();

if (title && post) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, post }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/posts');
    } else {
      alert('Failed to create project');
    }
  }


  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/post');
      } else {
        alert('Failed to delete project');
      }
    }
  };

  document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.project-list')
  .addEventListener('click', delButtonHandler);