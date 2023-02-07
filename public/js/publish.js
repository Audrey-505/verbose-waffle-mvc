

  const updateBtnHandler = async (event) => {
    let title = document.querySelector('.t-post').value
    let post = document.querySelector('.p-post').value
    if(event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id')

      const response = await fetch(`/api/posts/${id}`,{
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
        document.location.replace('/')
      } else {
        alert(response.statusText)
      }
    }
  }

  document
  .querySelector('.update-post')
  .addEventListener('click', updateBtnHandler)