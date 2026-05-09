<script>
    import { PUBLIC_API_URL } from "$env/static/public";
    import { useAuthState } from "$lib/states/authState.svelte.js";
    let authState = useAuthState();
    let todos = $state([]);

    const fetchTodos = async () => {
        const response = await fetch(`${PUBLIC_API_URL}/api/todos`);
        const data = await response.json();
        todos = data;
    };

    $effect(() => {
        fetchTodos();
    })
</script>

<h1>Welcome to the home page!</h1>

{#if authState.user}
<p><a href="/communities">Go to communities</a></p>
{/if}

<ul>
    {#each todos as todo}
    <li>{todo.name}</li>
    {/each}
</ul>