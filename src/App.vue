<template>
	<div :class="containerClass">

        <div class="layout-main-container-custom">
            <div class="layout-main">
                <router-view />
            </div>
            <Footer />
        </div>
        
    </div>
</template>

<script>
import Footer from '@/components/Footer.vue';

  export default {
    components: {
        Footer
    },
    data() {
        return {
            layoutMode: 'static',
            staticMenuInactive: false,
            overlayMenuActive: false,
            mobileMenuActive: false,
        }
    },
    computed: {
        containerClass() {
            return ['layout-wrapper', {
                'layout-static': this.layoutMode === 'static',
            }];
        }
    }
  }
</script>

<style>

body {
  background-color: rgb(37, 37, 38);
} 


.layout-main-container-custom {
    padding-top: 120px;
    padding-left: 56px;
    padding-right: 56px;
    padding-bottom: 28px;
}

</style>
