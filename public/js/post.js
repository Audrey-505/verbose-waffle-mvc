const newFormHandler = async(event) => {
    event.preventDefault()


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

    console.log(response)

    if (response.ok) {
      document.location.replace('/createpost');
    } else {
      alert('Failed to create project');
    }
  }

}

  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/createpost');
      } else {
        alert('Failed to delete project');
      }
    }
  };


  //UPDATE DEL FUNCTIONALITY
  const updateBtnHandler = async (event) => {
    if(event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id')

      const response = await fetch(`api/posts/${id}`,{
        method:'PUT',
        body: JSON.stringify({
          title,
          post
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.ok){
        document.location.replace('/createpost')
      } else {
        alert(response.statusText)
      }
    }
  }

// document
//   .querySelector('.new-post-form')
//   .addEventListener('submit', newFormHandler);

// document
//   .querySelector('.post-list')
//   .addEventListener('click', delButtonHandler);

if (document.querySelector('.new-post-form')) {
  document
      .querySelector('.new-post-form')
      .addEventListener('submit', newFormHandler);
}

if (document.querySelector('.post-list')) {
  document
      .querySelector('.post-list')
      .addEventListener('click', delButtonHandler);
}

//UPDATE DEL FUNCTIONALITY

// if (document.querySelector('.update-post')){
//   document
//   .querySelector('update-post')
//   .addEventListener('click', updateBtnHandler)
// }
