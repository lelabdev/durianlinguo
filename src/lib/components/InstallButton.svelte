<script lang="ts">
	import { onMount } from 'svelte';

	let deferredPrompt: any = null;
	let showInstallButton = $state(false);
	let isInstalling = $state(false);

	onMount(() => {
		// Check if already installed
		if (window.matchMedia('(display-mode: standalone)').matches) {
			// App is already installed
			return;
		}

		// Listen for the beforeinstallprompt event
		const handleBeforeInstallPrompt = (e: Event) => {
			// Prevent the mini-infobar from appearing on mobile
			e.preventDefault();
			// Stash the event so it can be triggered later
			deferredPrompt = e;
			// Show the install button
			showInstallButton = true;
		};

		window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

		// Listen for successful installation
		window.addEventListener('appinstalled', () => {
			// Hide the install button
			showInstallButton = false;
			deferredPrompt = null;
		});

		return () => {
			window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
		};
	});

	async function handleInstallClick() {
		if (!deferredPrompt) {
			return;
		}

		isInstalling = true;

		// Show the install prompt
		deferredPrompt.prompt();

		// Wait for the user to respond to the prompt
		const { outcome } = await deferredPrompt.userChoice;

		if (outcome === 'accepted') {
			console.log('User accepted the install prompt');
		} else {
			console.log('User dismissed the install prompt');
		}

		// Clear the deferredPrompt
		deferredPrompt = null;
		showInstallButton = false;
		isInstalling = false;
	}
</script>

{#if showInstallButton}
	<button
		onclick={handleInstallClick}
		disabled={isInstalling}
		class="btn btn-primary btn-sm flex items-center gap-2 shadow-md"
		aria-label="Install app"
	>
		<i class="fas fa-download"></i>
		<span class="hidden sm:inline">
			{isInstalling ? 'Installation...' : 'Installer'}
		</span>
	</button>
{/if}
