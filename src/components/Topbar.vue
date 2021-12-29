<template>
	<div class="layout-topbar" :style="projectInfo ? 'display: inline-table !important;' : ''">

        <template v-if="projectInfo">
            <div style="display: flex; align-items: center;">
                <div style="display: flex;align-items: center;width: 100%;place-content: center;">
                    
                    <h1>{{projectInfo.name}}&nbsp;</h1>
                    <h1>({{projectInfo.from}} -&nbsp;</h1>
                    <h1>{{projectInfo.to}})&nbsp;</h1> 
                    
                    <span v-if="this.$store.state.toggleValue">
                        <Badge :value="this.projectInfo.currentCF" size="xlarge" :severity="getTextColorFromCFIndex(this.projectInfo.currentCF)" />
                        &nbsp;<span style="font-size: 16px">/</span>&nbsp;
                    </span>
                    
                    <Badge :value="projectInfo.initialCF" :size="this.$store.state.toggleValue ? 'large' : 'xlarge'"
                    :severity="getTextColorFromCFIndex(projectInfo.initialCF)" />

                    <Button icon="pi pi-replay" class="p-button-rounded p-button-text p-button-plain ml-3"/>
                </div>
            </div>
        </template>
        
        <template v-if="projectInfo">
            <div style="display: flex; align-items: center; margin: 2rem 0;">
                <router-link to="/" class="layout-topbar-logo mr-3">
                    <img alt="Logo" :src="RoseLogo" />
                    <span class="mr-3">ROSE</span>
                    <img alt="Wecaremed Logo" :src="WecaremedLogo" class="ml-2" />
                </router-link>
                
                <InputSwitch id="appMode" v-model="toggleValue" @click="toggleView" />
                <label id="app-mode-label" for="appMode">{{appModeText}} use mode</label>
                
                <ul class="layout-topbar-menu hidden lg:flex origin-top">
                    <li>
                        <span>Logged in as Example User</span>
                        <button class="p-link layout-topbar-button user-button" @click="toggleMenu">
                            <i class="pi pi-user"></i>
                        </button>
                    </li>

                    <Menu ref="menu" :model="overlayMenuItems" :popup="true" />

                    <Dialog header="Confirmation" v-model:visible="displayConfirmation" :style="{width: '350px'}" :modal="true">
                        <div class="flex align-items-center justify-content-center">
                            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                            <span>Are you sure you want to log out?</span>
                        </div>
                        <template #footer>
                            <Button label="No" icon="pi pi-times" @click="closeConfirmation" class="p-button-text p-button-info"/>
                            <Button label="Yes" icon="pi pi-check" @click="logout" class="p-button-text p-button-info" autofocus />
                        </template>
                    </Dialog>
                </ul>
            </div>
        </template>

        <template v-else-if="!projectInfo">
            <router-link to="/" class="layout-topbar-logo mr-3">
                <img alt="Rose Logo" :src="RoseLogo" />
                <span class="mr-3">ROSE</span>
                <img alt="Wecaremed Logo" :src="WecaremedLogo" class="ml-2" />

            </router-link>
            
            <InputSwitch id="appMode" v-model="toggleValue" @click="toggleView" />
            <label id="app-mode-label" for="appMode">{{appModeText}} use mode</label>
            
            <ul class="layout-topbar-menu hidden lg:flex origin-top">
                <li>
                    <span>Logged in as Example User</span>
                    <button class="p-link layout-topbar-button user-button" @click="toggleMenu">
                        <i class="pi pi-user"></i>
                    </button>
                </li>

                <Menu ref="menu" :model="overlayMenuItems" :popup="true" />

                <Dialog header="Confirmation" v-model:visible="displayConfirmation" :style="{width: '350px'}" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span>Are you sure you want to log out?</span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" @click="closeConfirmation" class="p-button-text p-button-info"/>
                        <Button label="Yes" icon="pi pi-check" @click="closeConfirmation" class="p-button-text p-button-info" autofocus />
                    </template>
                </Dialog>
            </ul>
        </template>

	</div>

</template>

<script>
import RoseLogo from '@/assets/ROSE Logo.png'
import WecaremedLogo from '@/assets/Wecaremed Logo.png'
import Menu from 'primevue/menu';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputSwitch from 'primevue/inputswitch';
import axios from 'axios';
import { mapState, mapActions } from 'vuex'
import Badge from 'primevue/badge'

export default {
    components: {
        Menu,
        Dialog,
        Button,
        InputSwitch,
        Badge
    },
    props: ['projectInfo'],
    data() {
        return {
            RoseLogo: RoseLogo,
            WecaremedLogo: WecaremedLogo,
            displayConfirmation: false,
            overlayMenuItems: [
                {
                    label: 'Log out',
                    icon: 'pi pi-sign-out',
                    command: () => {this.openConfirmation()}
                },
            ],
        }
    },
    methods: {
        toggleMenu(event) {
            this.$refs.menu.toggle(event);
        },
        openConfirmation() {
            this.displayConfirmation = true;
        },
        closeConfirmation() {
            this.displayConfirmation = false;
        },
        ...mapActions([
        "toggleView"
        ]),
        getTextColorFromCFIndex(cfIndex) {
            if (cfIndex < 3)
                return "success"
            else if (cfIndex > 3 & cfIndex < 5)
                return "warning"
            else
                return "danger"
        },
        logout() {
            axios.get('/projects/logout').then(response => {
                console.log(response);
                this.$router.push('/login');
            }).catch(err => {
                console.log(err);
                this.$router.push('/login');
            });
        }
    },
    computed: {
        ...mapState([
            'toggleValue', 'appModeText'
        ])
    }
}
</script>

<style>
    #app-mode-label {
        margin-left: 0.75rem;
        line-height: 1;
    }
</style>

<style scoped>
    h1 {
        font-size: 3rem;
    }
</style>