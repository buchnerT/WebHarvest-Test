<script context="module" language="ts">
    export async function load(fetch) {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const fakeData = await response.json();

        if(response.ok) {
            return {
                props: {
                    fakeData
                }
            }
        }

        return {
            status: response.status,
            error: new Error("There was an error loading")
        }
    }
</script>

<script>
    export let fakeData
</script>

<div>
    <ul>
       {#each fakeData as f}
            <li>
                <a href="/">{fakeData.title}</a>
            </li>
       {/each}
    </ul>
</div>