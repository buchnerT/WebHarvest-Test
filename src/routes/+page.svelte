<body>
  <div class="text-center">
    <Heading class="my-1 mt-6 text-primary-400 text-6xl"  tag="h1" >Web<span class="text-primary-300">Harvest</span></Heading>
    <P class="text-center" weight="extralight" size="4xl">187187</P>
  </div>
  <form method="POST" class="flex gap-2 mr-36 ml-36 mt-36 z-10" on:submit|preventDefault={handleSubmit}>
    <Search name="link" size="lg" id="link" type="text"></Search>
    <Button type="submit" class="!p-2.5 bg-primary-400">
      <SearchOutline class="w-5 h-5" />
    </Button>
  </form>

  {#if $isLoading}
  <div class="overlay" in:fade="{{ duration: 300 }}" class:active={$isLoading} >
    <div class="sk-cube-grid">
      <div class="sk-cube sk-cube1"></div>
      <div class="sk-cube sk-cube2"></div>
      <div class="sk-cube sk-cube3"></div>
      <div class="sk-cube sk-cube4"></div>
      <div class="sk-cube sk-cube5"></div>
      <div class="sk-cube sk-cube6"></div>
      <div class="sk-cube sk-cube7"></div>
      <div class="sk-cube sk-cube8"></div>
      <div class="sk-cube sk-cube9"></div>
    </div>
  </div>
  {/if}

</body> 


<script lang="ts">
  import { Search, Button } from 'flowbite-svelte';
  import { SearchOutline } from 'flowbite-svelte-icons';
  import { Heading, P, A, Mark, Secondary } from 'flowbite-svelte';
  import { Popover} from 'flowbite-svelte';
  import { blur, fade, slide } from 'svelte/transition';
  import { writable } from 'svelte/store';
  import { isLoading } from '../lib/client-side/loadingStore';

  let progress = writable(0); // Tracks the progress of the task
  let taskId : any; // Will store the task ID returned from the backend

  // Function to handle the URL submit
  async function handleSubmit(event: Event) {
    event.preventDefault();
    isLoading.set(true);
    console.log(isLoading);
    
    progress.set(1); // Indicates form submission

    const form = document.querySelector('form');
    if (form) {
      const formData = new FormData(form);
      const linkValue = formData.get('link');

      try {
        const response = await fetch('/api/submitData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ link: linkValue })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        taskId = data.taskId; 

        pollTaskStatus(); 
      } catch (error) {
        console.error('Fetch error:', error);
        isLoading.set(false);
      }
    }
  }

  function pollTaskStatus() {
    const interval = setInterval(async () => {
      try {
        const statusResponse = await fetch(`/api/taskStatus/${taskId}`);
        if (!statusResponse.ok) {
          throw new Error('Status check failed');
        }

        const { status } = await statusResponse.json();

        if (status === 'scrapingCompleted') {
          progress.set(2);
          console.log("set 2");
        } else if (status === 'ratingCompleted') {
          progress.set(3);
          console.log("set 3");
        } else if (status === 'preparingResults') {
          progress.set(4);
          console.log("set 4")
        } else if (status === 'completed') {
          clearInterval(interval);
          progress.set(5); // Task complete
          isLoading.set(false);
        }
      } catch (error) {
        console.error('Polling error:', error);
        clearInterval(interval);
        isLoading.set(false);
      }
    }, 2000); // Poll every 2 seconds
  }
</script>


<style>
  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
    z-index: 1;
  }

  .overlay {
    top: 0;
    left: 0;
    width: 100%; 
    height: 100%; 
    background-color: #1A1A1D;
    opacity: 0; 
    z-index: 99999999; 
    transition: opacity 0.5s ease-in-out;
    display: flex; /* Allow for centering */
    align-items: center;
    justify-content: center;
  }

  .overlay.active {
    position: absolute;
    opacity: 1;
    z-index: 9999; 
  }

  .sk-cube-grid {
    width: 40px;
    height: 40px;
    margin: 100px auto;
  }

  .sk-cube-grid .sk-cube {
    width: 33%;
    height: 33%;
    background-color: #333;
    float: left;
    -webkit-animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
            animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out; 
  }
  .sk-cube-grid .sk-cube1 {
    -webkit-animation-delay: 0.2s;
            animation-delay: 0.2s; }
  .sk-cube-grid .sk-cube2 {
    -webkit-animation-delay: 0.3s;
            animation-delay: 0.3s; }
  .sk-cube-grid .sk-cube3 {
    -webkit-animation-delay: 0.4s;
            animation-delay: 0.4s; }
  .sk-cube-grid .sk-cube4 {
    -webkit-animation-delay: 0.1s;
            animation-delay: 0.1s; }
  .sk-cube-grid .sk-cube5 {
    -webkit-animation-delay: 0.2s;
            animation-delay: 0.2s; }
  .sk-cube-grid .sk-cube6 {
    -webkit-animation-delay: 0.3s;
            animation-delay: 0.3s; }
  .sk-cube-grid .sk-cube7 {
    -webkit-animation-delay: 0s;
            animation-delay: 0s; }
  .sk-cube-grid .sk-cube8 {
    -webkit-animation-delay: 0.1s;
            animation-delay: 0.1s; }
  .sk-cube-grid .sk-cube9 {
    -webkit-animation-delay: 0.2s;
            animation-delay: 0.2s; }

  @-webkit-keyframes sk-cubeGridScaleDelay {
    0%, 70%, 100% {
      -webkit-transform: scale3D(1, 1, 1);
              transform: scale3D(1, 1, 1);
    } 35% {
      -webkit-transform: scale3D(0, 0, 1);
              transform: scale3D(0, 0, 1); 
    }
  }

  @keyframes sk-cubeGridScaleDelay {
    0%, 70%, 100% {
      -webkit-transform: scale3D(1, 1, 1);
              transform: scale3D(1, 1, 1);
    } 35% {
      -webkit-transform: scale3D(0, 0, 1);
              transform: scale3D(0, 0, 1);
    } 
  }
</style>
