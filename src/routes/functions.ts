
export async function handleSubmit() {
  const form = document.querySelector('form');

  
  if (form) {
    const formData = new FormData(form);
    const linkValue = formData.get('link');
    console.log(linkValue);
    

    const response = await fetch('/src/routes/api/submitEndpoint.ts', {
        method: 'POST',
        body: linkValue
    });

    const data = await response.json();
    console.log(data);
  }
}
