<template>
	<div class="layout-footer">
		<img alt="Logo" :src="RoseLogo" height="20" class="mr-2" />
		ROSE: Carbon Footprint Analysis Framework by
		<!-- <span class="font-medium ml-2">ISA Group</span> -->
		<img alt="Logo" :src="IsaLogo" height="20" class="ml-2" />
	</div>
</template>

<script>
import RoseLogo from "@/assets/ROSE Logo.png"
import IsaLogo from "@/assets/ISA Logo.svg"

export default {
	name: "Footer",
	data() {
		return {
			RoseLogo: RoseLogo,
			IsaLogo: IsaLogo
		}
	}
}
</script>

<style scoped>

</style>