<script lang="ts">
	import DailyTip from './components/DailyTip.svelte';
	import TodayWorld from './components/TodayWord.svelte';
	import Learning from './components/Learning.svelte';
	import Progress from './components/Progress.svelte';
</script>

<svelte:head>
	<title>Review | Durianlinguo</title>
</svelte:head>

<Progress />
<TodayWorld />
<Learning />
<DailyTip />
