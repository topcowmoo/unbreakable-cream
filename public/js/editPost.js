const titleBox = document.getElementById('title');
const bodyBox = document.getElementById('edit-post');

const getTableData = async () => {
  try {
    const postId = window.location.pathname.split('/').pop(); // Replace 'your_post_id' with the actual post_id
    const response = await fetch(`/api/posts/${postId}`); // Include the post_id in the fetch URL
    const data = await response.json();
    console.log('Data:', data);
    const { post_title, post_content } = data;
    console.log('post_title:', post_title);
    console.log('post_content:', post_content);
    titleBox.value = post_title;
    bodyBox.value = post_content;
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
};

getTableData();
const updatePost = async () => {
  try {
    const postId = window.location.pathname.split('/').pop(); // Replace 'your_post_id' with the actual post_id
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        post_title: titleBox.value,
        post_content: bodyBox.value,
      }),
    });
    const data = await response.json();
    console.log('Updated post:', data);
  } catch (error) {
    console.error('Error updating post: ', error);
  }
};

// titleBox.addEventListener('input', updatePost);
// bodyBox.addEventListener('input', updatePost);

const submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', updatePost);

getTableData();
