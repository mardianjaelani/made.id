<template>
    <v-app>
        <sidebar />
        <navigation-header-default />
        <dashboard-content></dashboard-content>
        <content-footer />
    </v-app>
</template>

<script>
import Sidebar from './Partials/Sidebar.vue'
import NavigationHeaderDefault from './Partials/NavigationHeaderDefault.vue'
import DashboardContent from './Content.vue'
import ContentFooter from './Partials/ContentFooter.vue'

export default {
    name:'DefaultLayout',
    components:{
        NavigationHeaderDefault,
        DashboardContent,
        Sidebar,
        ContentFooter
    }
}
</script>