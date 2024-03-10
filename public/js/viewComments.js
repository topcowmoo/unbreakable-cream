const newCommentForm = document.querySelectorAll('#new-comment-form');

const displayOptions = async ()=>{
  const cardOptions = document.querySelector('.card-options');
  // Get username from the comment box
  const cardUsername = document.querySelector('#username').innerHTML;
  // Get the req.session.username
  const sessionUsername = document.querySelector('.card-options').dataset.currentuser;



  // If card username and req.session.username match, display edit and delete buttons
  if(cardUsername===sessionUsername){
    cardOptions.style.display = 'flex';
  }
};


// Create new comment
const commentHandler = async (event) =>{
  event.preventDefault();

  const comment = document.querySelector('#new-comment').value.trim();
  const post_id = event.target.dataset.id;

  console.log('post_id:', post_id); // Log post_id value

  if(comment){
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({comment_text: comment, post_id: post_id}),
      headers: ({'Content-Type': 'application/json'})
    });

    if(response.ok){

      document.location.reload();
    }else{
      // When unsuccessful, show alert
      alert('Failed to create a comment.');
    }
  }
};

displayOptions();
if(newCommentForm){
  newCommentForm.forEach(element => element.addEventListener('submit', commentHandler));
}