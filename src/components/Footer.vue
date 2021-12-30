<template>
	<div class="layout-footer">
		<img alt="Logo" :src="InterregLogo" class="ml-2" />
		<img alt="ProjectCo_Financed" :src="ProjectCo_Financed" height="100" class="ml-2" />
	</div>
</template>

<script>
import InterregLogo from "@/assets/Interreg Logo.png"
import ProjectCo_Financed from "@/assets/ProjectCo_Financed.png"

export default {
	name: "Footer",
	data() {
		return {
			InterregLogo: InterregLogo,
			ProjectCo_Financed: ProjectCo_Financed
		}
	}
}
</script>

<style scoped>

</style>