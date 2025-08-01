<script>
  import { env } from "$lib/utils/env";

  const breakpoints = {
    base: "block sm:hidden",
    sm: "hidden sm:block md:hidden",
    md: "hidden md:block lg:hidden",
    lg: "hidden lg:block xl:hidden",
    xl: "hidden xl:block 2xl:hidden",
    "2xl": "hidden 2xl:block",
  };
</script>

{#if env.isDev}
  <div
    class="pointer-events-none fixed right-2 bottom-2 z-50 rounded-md bg-black/60 px-2 py-1 font-mono text-xs text-white select-none"
  >
    <span class={breakpoints.base}>base</span>
    <span class={breakpoints.sm}>sm</span>
    <span class={breakpoints.md}>md</span>
    <span class={breakpoints.lg}>lg</span>
    <span class={breakpoints.xl}>xl</span>
    <span class={breakpoints["2xl"]}>2xl</span>
  </div>
{/if}
