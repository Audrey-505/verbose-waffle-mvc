const delComHandler = async (event) => {
    console.log('TEST')
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/comments/${id}`, {
            method: 'DELETE',
            body: JSON.stringify({
                id
              }),
        });

        if (response.ok) {
            document.location.replace('/createpost');
        } else {
            alert('Failed to delete project');
        }
    }
};


// document
//     .querySelector('#deletebtn')
//     .addEventListener('click', delComHandler)

document
    .querySelector('#delCom')
    .addEventListener('submit', delComHandler)
