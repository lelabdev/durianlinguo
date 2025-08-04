<script lang="ts">
	const { title, description, children } = $props<{ title?: string; description?: string }>();

	const siteName = 'Durianlinguo';

	const seoData = {
		title: title ? `${title} | ${siteName}` : 'Durianlinguo - Learn Bisaya',
		description:
			description ??
			'Learn essential Bisaya words in minutes. Durianlinguo helps travelers speak basic Filipino (Cebuano) with 300 key phrases — fun, fast, and perfect for tourists.',
		url: 'https://durianlinguo.lelab.dev',
		image: '%sveltekit.assets%/og-image.png',
		locale: 'en'
	};
</script>

<svelte:head>
	<title>{seoData.title}</title>
	<meta property="og:title" content={seoData.title} />
	<meta name="twitter:title" content={seoData.title} />

	<meta property="og:description" content={seoData.description} />

	<meta name="description" content={seoData.description} />
	<meta name="twitter:description" content={seoData.description} />

	<meta property="og:image" content={seoData.image} />
	<meta property="og:url" content={seoData.url} />
	<meta property="og:site_name" content={siteName} />
	<meta property="og:locale" content={seoData.locale} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={seoData.title} />
	<meta name="twitter:description" content={seoData.description} />
	<meta name="twitter:image" content={seoData.image} />

	{#if children}
		{@render children()}
	{/if}
</svelte:head>
