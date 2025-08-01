<script lang="ts">
	const day = 7;
	const total = 30;

	let progress = $derived((day / total) * 100);
</script>

<div class="mb-8">
	<div class="mb-2 flex items-center justify-between">
		<h2 class="text-lg font-semibold text-woodBrown">Your Progress</h2>
		<span class="font-bold text-deepGreen">Day {day} / {total}</span>
	</div>
	<div class="progress-bar">
		<div class="progress-fill" style="width: {progress}%"></div>
	</div>
</div>
