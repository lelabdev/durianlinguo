<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";
  import type { PageData } from "./$types";

  export let data: PageData;
  const { form } = superForm(data.form);
</script>

<form method="POST" use:form>
  <label>
    Email
    <input name="email" type="email" bind:value={form.email} />
    {#if form.errors.email}
      <span class="error">{form.errors.email}</span>
    {/if}
  </label>

  <label>
    Password
    <input name="password" type="password" bind:value={form.password} />
    {#if form.errors.password}
      <span class="error">{form.errors.password}</span>
    {/if}
  </label>

  <button type="submit">Login</button>
</form>
