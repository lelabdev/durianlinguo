<script lang="ts">
	import type { PageProps } from './$types';
	import Head from './Head.svelte';
	let { data }: PageProps = $props();
</script>

<Head {...data} />

<div class="font-nunito min-h-screen pb-20 text-darkGray">
	<!-- Hero Section -->
	<section class="container mx-auto px-4 py-12 text-center">
		<h1 class="mb-4 text-4xl font-bold text-woodBrown md:text-5xl">
			Learn Bisaya Online in a Fun Way
		</h1>
		<p class="mx-auto mb-8 max-w-2xl text-lg text-darkGray">
			Discover Bisaya through interactive flashcards, games, and personalized learning. <strong
				>Free & Open Source</strong
			>.
		</p>
		<a
			href="#get-started"
			class="btn-primary inline-block rounded-full px-8 py-3 font-bold text-white shadow-md"
			>Get Started</a
		>
	</section>

	<!-- Features Section -->
	<section class="bg-white py-12">
		<div class="container mx-auto px-4">
			<h2 class="mb-12 text-center text-3xl font-bold text-woodBrown">Why Sulti?</h2>
			<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
				<div class="feature-card rounded-xl border border-warmYellow bg-gray-50 p-6 shadow-sm">
					<div class="mb-4 text-3xl text-primaryRed"><i class="fas fa-graduation-cap"></i></div>
					<h3 class="mb-2 text-xl font-semibold">Fun Learning</h3>
					<p>Interactive flashcards, games and challenges to learn effortlessly.</p>
				</div>
				<div class="feature-card rounded-xl border border-deepGreen bg-gray-50 p-6 shadow-sm">
					<div class="mb-4 text-3xl text-primaryRed"><i class="fas fa-globe-asia"></i></div>
					<h3 class="mb-2 text-xl font-semibold">Regional Language</h3>
					<p>Discover Bisaya, a language spoken in the Philippines.</p>
				</div>
				<div class="feature-card rounded-xl border border-woodBrown bg-gray-50 p-6 shadow-sm">
					<div class="mb-4 text-3xl text-primaryRed"><i class="fas fa-code-branch"></i></div>
					<h3 class="mb-2 text-xl font-semibold">Open Source</h3>
					<p>Contribute, improve and make the app accessible to everyone.</p>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section id="get-started" class="bg-woodBrown py-16 text-center text-white">
		<div class="container mx-auto px-4">
			<h2 class="mb-4 text-3xl font-bold">Start Learning Bisaya Today</h2>
			<p class="mx-auto mb-8 max-w-xl text-lg">
				Free, no ads, and open source. Access Sulti directly from your browser.
			</p>
			<a
				href="/login"
				class="inline-block rounded-full bg-white px-8 py-3 font-bold text-woodBrown shadow-md"
				>Login / Sign Up</a
			>
		</div>
	</section>

	<!-- Footer -->
	<footer class="py-6 text-center text-sm text-gray-600">
		<p>
			Made with ❤️ | Sulti - 2025 | <a href="https://github.com/sulti-app" class="underline"
				>GitHub</a
			>
		</p>
	</footer>
</div>
