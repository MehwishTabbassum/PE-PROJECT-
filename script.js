document.getElementById('storyForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const genre = document.getElementById('genre').value;
  const setting = document.getElementById('setting').value;
  const character = document.getElementById('character').value;

  const storyOutput = document.getElementById('storyOutput');
  storyOutput.innerHTML = "<p><em>Generating your tale...</em></p>";

  try {
    const response = await fetch('/generate-story', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ genre, setting, character })
    });

    const data = await response.json();

    if (data.story) {
      storyOutput.innerHTML = `<h2>Your Tale</h2><p>${data.story.replace(/\n/g, '<br>')}</p>`;
    } else {
      storyOutput.innerHTML = `<p class="error">Oops! ${data.error}</p>`;
    }
  } catch (err) {
    storyOutput.innerHTML = `<p class="error">Something went wrong. Please try again.</p>`;
    console.error(err);
  }
});
