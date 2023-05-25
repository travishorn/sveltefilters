<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Filter from '$lib/Filter.svelte';

	/** @type {Array<App.FilterOption>} */
	let schoolYears = [];

	/** @type string */
	let selectedSchoolYear;

	/** @type {Array<App.SiteEnrollment>} */
	let reportData = [];

	async function fetchSchoolYears() {
		const res = await fetch(`/api/filter/schoolYear`);
		schoolYears = await res.json();
		selectedSchoolYear = $page.url.searchParams.get('schoolYear') ?? schoolYears[0].value;
	}

	async function fetchReportData() {
		const res = await fetch(`/api/enrollment?schoolYear=${selectedSchoolYear}`);
		reportData = await res.json();
	}

	onMount(async () => {
		await fetchSchoolYears();
		fetchReportData();
	});
</script>

<form>
	<Filter
		id="schoolYear"
		label="School Year"
		options={schoolYears}
		bind:selected={selectedSchoolYear}
		on:change={fetchReportData}
	/>
</form>

<table>
	<thead>
		<tr>
			<th>Site</th>
			<th>Enrollment</th>
		</tr>
	</thead>
	<tbody>
		{#each reportData as site}
			<tr>
				<td>{site.name}</td>
				<td>{site.enrollment}</td>
			</tr>
		{/each}
	</tbody>
</table>
