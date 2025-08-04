<script lang="ts">
	import { icons } from '$utils';
	import Head from '$components/Head.svelte';
	import Why from '$content/Why.svx';
</script>

<Head />

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
		<a href="/learn" class="btn btn-lg">Get Started</a>
	</section>
	<!-- Features Section -->
	<section class="bg-white py-12">
		<div class="container mx-auto px-4">
			<h2 class="mb-12 text-center text-3xl font-bold text-woodBrown">Why Durianlinguo?</h2>
			<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
				<div class="feature-card rounded-xl border border-warmYellow bg-gray-50 p-6 shadow-sm">
					<div class="mb-4 text-3xl text-primaryRed">
						<icons.learn />
					</div>
					<h3 class="mb-2 text-xl font-semibold">Fun Learning</h3>
					<p>Interactive flashcards, games and challenges to learn effortlessly.</p>
				</div>
				<div class="feature-card rounded-xl border border-deepGreen bg-gray-50 p-6 shadow-sm">
					<div class="mb-4 text-3xl text-primaryRed">
						<icons.globe />
					</div>
					<h3 class="mb-2 text-xl font-semibold">Regional Language</h3>
					<p>Discover Bisaya, a language spoken in the Philippines.</p>
				</div>
				<div class="feature-card rounded-xl border border-woodBrown bg-gray-50 p-6 shadow-sm">
					<div class="mb-4 text-3xl text-primaryRed">
						<icons.gitMerge />
					</div>
					<h3 class="mb-2 text-xl font-semibold">Open Source</h3>
					<p>Contribute, improve and make the app accessible to everyone.</p>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section id="get-started" class="bg-base-100 py-16 text-center text-base-content">
		<div class="container mx-auto px-4">
			<h2 class="mb-4 text-3xl font-bold">Start Learning Bisaya Today</h2>
			<p class="mx-auto mb-8 max-w-xl text-lg">
				Free, no ads, and open source. Access Durianlinguo directly from your browser.
			</p>
			<a href="/learn" class="btn btn-lg">Start now!</a>
		</div>
	</section>
	<section class="mx-auto prose">
		<Why />
	</section>
	<!-- Footer -->
	<footer class="py-6 text-center text-sm text-gray-600">
		<p>
			Made with ❤️ by
			<a href="https://lelab.dev" class="link link-hover"> Lelab.dev </a>
			| durianlinguo.lelab.dev - 2025 |
			<a href="https://github.com/sulti-app" class="link link-hover">GitHub</a>
		</p>
	</footer>
</div>
