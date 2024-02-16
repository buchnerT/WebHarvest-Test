<header>
  <div class="text-center">
    <Heading customSize="" class="my-1 text-primary-400"  tag="h1" size="lg" >Web<span class="text-primary-300">Harvest</span></Heading>
    <P class="text-center" weight="extralight" size="4xl">187187</P>
  </div>
</header>

<body id="background" >
  <form method="POST" class="flex gap-2 mr-36 ml-36 mt-36" on:submit|preventDefault={handleSubmit}>
    <Search name="link" id="link" type="text"></Search>
    <Button type="submit" class="!p-2.5 bg-primary-400">
      <SearchOutline class="w-5 h-5" />
    </Button>
  </form>
</body> 


<script lang="ts">
  import { Search, Button } from 'flowbite-svelte';
  import { SearchOutline } from 'flowbite-svelte-icons';
  import { Heading, P, A, Mark, Secondary } from 'flowbite-svelte';
  import { Popover} from 'flowbite-svelte';
  import { blur, fade, slide } from 'svelte/transition';
  import { writable } from 'svelte/store';

  // Indicator for the Loading Bar
  let loadingProgress = writable(0); 
  let isLoading = false;

  // Function to Handle the URL Submit
  async function handleSubmit(event: Event) {
  let isLoading = true;
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
</script>


<style>
  #background {
    background-color : #1A1A1D;
  }
</style>
