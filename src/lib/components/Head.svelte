<script lang="ts">
    import type { PageProps } from "./$types";
    const { title, children, description }: PageProps = $props();

    const siteName = "LudoApex";
    const fullTitle = title ? `${title} | ${siteName}` : siteName;
    const defaultDescription =
        "Design dynamique, performance, et présence en ligne à votre image. VTT, gravel, accrobranche, escalade : un site sur mesure pour les pros de l’outdoor.";

    const fullDescription = description ? description : defaultDescription;
</script>

<svelte:head>
    <title>{fullTitle}</title>
    <meta property="og:title" content={fullTitle} />
    <meta name="twitter:title" content={fullTitle} />

    <meta property="og:description" content={fullDescription} />
    <meta name="description" content={fullDescription} />
    <meta name="twitter:description" content={fullDescription} />

    {#if children}
        {@render children()}
    {/if}
</svelte:head>
