<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	/** @type {string} */
	export let id;

	/** @type {string} */
	export let label;

	/** @type {string} */
	export let selected;

	/** @type {Array<App.FilterOption>} */
	export let options;

	function updateUrlSearchParams() {
		let urlSearchParams = new URLSearchParams($page.url.searchParams.toString());
		urlSearchParams.set(id, selected);
		goto(`?${urlSearchParams.toString()}`);
		dispatch('change');
	}
</script>

<div>
	<label for={id}>{label}</label>
	<select {id} name={id} bind:value={selected} on:change={updateUrlSearchParams}>
		{#each options as option}
			<option value={option.value}>{option.label}</option>
		{/each}
	</select>
</div>
