<script lang="ts">
	import Card from '$ui/card.svelte';
	import Button from './button.svelte';
	import Preset from './preset.svelte';
	import Badge from './badge.svelte';
	import OutlineBtn from './outline-btn.svelte';
</script>

<div class="bg-primary-50-950">Light or Dark</div>

<div class="scheme-light">
	<div class="bg-primary-50-950 text-primary-950-50">Always Light Scheme</div>
</div>

<div class="scheme-dark">
	<div class="bg-primary-50-950 text-primary-950-50">Always Dark Scheme</div>
</div>

<Button />

<Card />

<Preset />

<Badge />

<OutlineBtn />
