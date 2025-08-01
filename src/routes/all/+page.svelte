<script lang="ts">
	import dico from '$content/bisaya.json';
</script>

list all words :

<div class="mx-auto grid w-xl grid-cols-2 text-black">
	{#each dico as word, index (index)}
		<p>{word.word}</p>
		<p class="text-lime-800">{word.translation.en}</p>
	{/each}
</div>
