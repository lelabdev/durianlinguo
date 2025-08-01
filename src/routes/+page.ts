import type { PageLoad } from "./$types"

export const load: PageLoad = () => {
  return {
    isForge: true,
    seo: {
      title: "Sulti - Learn Bisaya",
      description:
        "⚒️ Pick your stack, 🔨 Strike the anvil.   Forge your perfect SvelteKit boilerplate. Powered by lelab.dev.",
      url: "https://svelteforge.lelab.dev",
      image: "https://svelteforge.lelab.dev/og-image.png",
      locale: "en",
      siteName: "Sulti",
    },
  }
}
