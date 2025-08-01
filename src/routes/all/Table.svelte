<script lang="ts">
	let { words = $bindable() } = $props();
</script>

<table class="table mx-auto max-w-xl">
	<thead>
		<tr>
			<th class="capitalize">bisaya</th>
			<th class="capitalize">English</th>
			<th class="capitalize">Category</th>
		</tr>
	</thead>
	<tbody>
		{#each words as word, index (index)}
			<tr class="hover:bg-base-300">
				<td>{word.word} </td>
				<td>{word.translation.en}</td>
				<td>{word.category}</td>
			</tr>
		{/each}
	</tbody>
</table>
