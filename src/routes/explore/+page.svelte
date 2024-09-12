<script type="ts">
	import HomeLayout from '$lib/layouts/HomeLayout.svelte';
	import Footer from '$lib/layouts/Footer.svelte';
	import ExploreLibraries from '$lib/components/pages/explore/ExploreLibraries.svelte';
</script>

<svelte:head>
	<title>Explore Libraries</title>
</svelte:head>
<HomeLayout>
	<div class="min-h-screen dark:bg-[#29303d]">
		<ExploreLibraries />
	</div>
	<Footer />
</HomeLayout>
