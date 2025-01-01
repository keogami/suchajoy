<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	let count = $state(data.value);
	async function inc() {
		let res = await fetch('/inc', {
			method: 'POST'
		});

		let data = await res.json();

		count = data.value;
	}
</script>

<div>
	current value: {count}
</div>

<button onclick={inc}> inc </button>
