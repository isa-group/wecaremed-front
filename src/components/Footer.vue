<template>
	<div class="layout-footer">
		<img alt="Logo" :src="InterregLogo" class="ml-2" />
		<!-- <img alt="Logo" :src="RoseLogo" height="20" class="mr-2" />
		<span>ROSE: Carbon Footprint Analysis Framework by</span>
		<img alt="Logo" :src="IsaLogo" height="20" class="ml-2" /> -->
		<img alt="ProjectCo_Financed" :src="ProjectCo_Financed" height="100" class="ml-2" />
	</div>
</template>

<script>
import RoseLogo from "@/assets/ROSE Logo.png"
import IsaLogo from "@/assets/ISA Logo.svg"
import InterregWecaremedLogo from "@/assets/Interreg Wecaremed Logo.png"
import InterregLogo from "@/assets/Interreg Logo.png"
import ProjectCo_Financed from "@/assets/ProjectCo_Financed.png"

export default {
	name: "Footer",
	data() {
		return {
			RoseLogo: RoseLogo,
			IsaLogo: IsaLogo,
			InterregWecaremedLogo: InterregWecaremedLogo,
			InterregLogo: InterregLogo,
			ProjectCo_Financed: ProjectCo_Financed
		}
	}
}
</script>

<style scoped>

</style>