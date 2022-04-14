<template>
	<div class="layout-topbar" :style="projectInfo ? 'display: inline-table !important;' : ''">

        <template v-if="projectInfo">
            <div style="display: flex; align-items: center;">
                <router-link to="/" class="layout-topbar-logo mr-3">
                    <img alt="Wecaremed Logo" :src="WecaremedLogo" class="ml-2" />
                </router-link>

                    <div style="display: flex;align-items: center;width: 100%;place-content: center;">
                        
                        <h2>{{projectInfo.name}}&nbsp;</h2>
                        <h2>({{ (new Date(projectInfo.from).getMonth() + 1).toString().padStart(2, "0") + '/' + new Date(projectInfo.from).getFullYear()}} -&nbsp;</h2>
                        <h2>{{(new Date(projectInfo.to).getMonth() + 1).toString().padStart(2, "0") + '/' + new Date(projectInfo.to).getFullYear()}})&nbsp;</h2> 
                        
                        <Badge :value="initialCF + ' t CO2e'" size="large" :class="toggleValue == true ? 'initialCF' : 'currentCF'" :severity="getTextColorFromCFIndex(initialCF)"
                        v-tooltip.bottom="'Preparation Phase CF'" />
                        
                        <span v-if="$store.state.toggleValue">
                            &nbsp;<span style="font-size: 16px">--></span>&nbsp;
                            <Badge :value="currentCF + ' t CO2e'" size="large" class="currentCF" :severity="getTextColorFromCFIndex(currentCF)"
                            v-tooltip.bottom="'Execution Phase CF'"/>
                        </span>
                        

                        <!-- Al recalcular el CF, se devuelve el project con los nuevos datos, por tanto, es necesario actualizar
                             la vista, y para ello hay que modificar informacion fuera de este componente, lo cual, complica las cosas -->
                             
                        <!-- <Button icon="pi pi-replay" class="p-button-rounded p-button-text p-button-plain ml-3" @click="calculateCF" /> -->

                    </div>
                
                <ul class="layout-topbar-menu lg:flex origin-top">
                    <div class="layout-topbar-menu">
                        <li>
                            <label id="app-mode-label" for="appMode">{{appModeText}} use mode</label>
                            <InputSwitch id="appMode" v-model="toggleValue" @click="toggleView" />
                        </li>
                    </div>
                    <li>
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
                            <Button label="No" icon="pi pi-times" @click="closeConfirmation" class="p-button-text p-button-info" autofocus/>
                            <Button label="Yes" icon="pi pi-check" @click="logout" class="p-button-text p-button-info" />
                        </template>
                    </Dialog>
                </ul>
            </div>
        </template>

        <template v-else-if="!projectInfo">
            <router-link to="/" class="layout-topbar-logo mr-3">
                <img alt="Wecaremed Logo" :src="WecaremedLogo" class="ml-2" />

            </router-link>
            
            <ul class="layout-topbar-menu lg:flex origin-top">
                
                <div class="layout-topbar-menu">
                    <li>
                        <label id="app-mode-label" for="appMode">{{appModeText}} use mode</label>
                        <InputSwitch id="appMode" v-model="toggleValue" @click="toggleView" />
                    </li>
                </div>
                <li>
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
                        <Button label="No" icon="pi pi-times" @click="closeConfirmation" class="p-button-text p-button-info" autofocus/>
                        <Button label="Yes" icon="pi pi-check" @click="logout" class="p-button-text p-button-info" />
                    </template>
                </Dialog>
            </ul>
        </template>

	</div>

</template>

<script>
import WecaremedLogo from '@/assets/Wecaremed Logo.png'
import Menu from 'primevue/menu';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputSwitch from 'primevue/inputswitch';
import axios from 'axios';
import { mapState } from 'vuex'
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
        toggleView() {
            this.$store.commit("toggleView")
            if (this.$route.name === "Project Details Simple" && this.$store.state.toggleValue === true) {
                window.location = ("/projects/" + this.$route.params.id + "/advanced")
            }
            if (this.$route.name === "Project Details Advanced" && this.$store.state.toggleValue === false) {
                window.location = ("/projects/" + this.$route.params.id)
            }
        },
        getTextColorFromCFIndex(cfIndex) {
            cfIndex
            // if (cfIndex < 150)
            //     return "success"
            // else if (cfIndex > 150 & cfIndex < 250)
            //     return "warning"
            // else
            //     return "danger"
            return ""
        },
        logout() {
            this.$store.dispatch("saveUsername", '');
            this.$store.dispatch("savePassword", '');
            this.$store.dispatch("saveUserId", '');
            axios.post('/auth/logout').then(() => { 
                window.location.href = '/login';
            }).catch(() => {
                window.location.href = '/login';
                this.$toast.add({severity:'success', summary: 'Successful', detail: 'Logged out successfully', life: 3000});
            });
        }
    },
    computed: {
        ...mapState([
            'toggleValue', 'appModeText'
        ]),
        initialCF() {
            return this.projectInfo ? this.projectInfo.initialCF : null
        },
        currentCF() {
            return this.projectInfo ? this.projectInfo.currentCF : null
        }
    }
}
</script>

<style>
    #app-mode-label {
        position: relative;
        bottom: 7px;
        margin-right: 0.75rem;
    }

    .layout-topbar-menu {
        align-items: center;
        width: max-content;
    }

    .initialCF {
        background-color: white;
        color: black;
    }

    .currentCF {
        background-color: black;
        color: white;
    }
</style>

<style scoped>
    h1 {
        font-size: 2rem;
    }
</style>