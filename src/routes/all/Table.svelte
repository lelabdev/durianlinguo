<script lang="ts">
	let { words = $bindable() } = $props();
	console.log($inspect(words));
</script>

<table class="table mx-auto max-w-xl">
	<!-- head -->
	<thead>
		<tr>
			<th></th>
			<th class="capitalize">bisaya</th>
			<th class="capitalize">English</th>
			<th class="capitalize">Category</th>
		</tr>
	</thead>
	<tbody>
		{#each words as word, index (index)}
			<tr class="hover:bg-base-300">
				<th>{index}</th>
				<td>{word.word} </td>
				<td>{word.translation.en}</td>
				<td>{word.category}</td>
			</tr>
		{/each}
	</tbody>
</table>
