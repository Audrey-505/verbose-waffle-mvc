

  const updateComHandler = async (event) => {
    const comment_text = document.querySelector('.updateCom').value
    if(event.target.hasAttribute('data-id')) {
      //const id = event.target.getAttribute('data-id')
      const id = document.querySelector('.btn').getAttribute('data-id')

      const response = await fetch(`/api/comments/${id}`,{
        method:'PUT',
        body: JSON.stringify({
          comment_text
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
  .querySelector('.updateComment')
  .addEventListener('submit', updateComHandler)