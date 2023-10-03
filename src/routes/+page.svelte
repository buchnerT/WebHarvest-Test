<header>
  <div class="text-center">
    <Heading customSize="" class="my-1 text-primary-400"  tag="h1" size="lg" >Web<span class="text-primary-300">Harvest</span></Heading>
    <P class="text-center" weight="extralight" size="4xl">187187</P>
  </div>
</header>

<body id="background" >
  <form class="flex gap-2 mr-36 ml-36 mt-36" method="POST">
    <Search on:click size="md" />
    <Button type="submit" class="!p-2.5 bg-primary-400">
      <SearchOutline class="w-5 h-5" />
    </Button>
  </form>
</body>

<a href="/process">Process</a>

<script>
  import { Search, Button } from 'flowbite-svelte';
  import { SearchOutline } from 'flowbite-svelte-icons';
  import { Heading, P, A, Mark, Secondary } from 'flowbite-svelte';
  import { Popover} from 'flowbite-svelte';
  import { blur, fade, slide } from 'svelte/transition';
</script>


<style>
  #background {
    background-color : #1A1A1D;
  }
</style>

