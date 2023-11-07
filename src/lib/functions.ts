export async function handleSubmit(event: Event) {
  event.preventDefault();
  const form = document.querySelector('form');

  if (form) {
    const formData = new FormData(form);
    const linkValue = formData.get('link');
    console.log(linkValue);

    const response = await fetch('/api/submitData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ link: linkValue })
    });

    const data = await response.json();
    console.log(data);
  }
}