
/*export async function handleSubmit() {
  const form = document.querySelector('form');

  
  if (form) {
    const formData = new FormData(form);
    const linkValue = formData.get('link');
    console.log(linkValue);
    

    const response = await fetch('/src/routes/api/submitData.ts', {
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
*/