<script type="ts">
	import HomeLayout from '$lib/layouts/HomeLayout.svelte';
	import Banner from '$lib/components/pages/home/Banner.svelte';
	import Features from '$lib/components/pages/home/Features.svelte';
	import Note from '$lib/components/pages/home/Note.svelte';
	import TimedFeatures from '$lib/components/pages/home/TimedFeatures.svelte';
	import ConnectDiscord from '$lib/components/pages/home/ConnectDiscord.svelte';
	import SupportGroups from '$lib/components/pages/home/SupportGroups.svelte';
	import HighPoints from '$lib/components/pages/home/HighPoints.svelte';
	import Status from '$lib/components/pages/home/Status.svelte';
	import Blog from '$lib/components/pages/home/Blog.svelte';
	import Support from '$lib/components/pages/home/Support.svelte';
	import OurStory from '$lib/components/pages/home/OurStory.svelte';
	import Examples from '$lib/components/pages/home/Examples.svelte';
</script>

<svelte:head>
	<title>Flogram: AI's language of choice</title>
</svelte:head>
<HomeLayout>
	<Banner />
	<Features />
	<Note />
	<TimedFeatures />
	<OurStory />

	<!--	<SupportGroups />-->
	<!--	<HighPoints />-->
	<!--	<Status />-->
	<!--	<Examples />-->
	<!--	<Blog />-->
	<!--	<Support />-->

	<ConnectDiscord />
</HomeLayout>
