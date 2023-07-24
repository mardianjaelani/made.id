<template>
    <v-app>
        <!-- <sidebar /> -->
        <navigation-header />
        <dashboard-content></dashboard-content>
        <content-footer />
    </v-app>
</template>

<script>
// import Sidebar from './Partials/Sidebar.vue'
import NavigationHeader from './Partials/NavigationHeader.vue'
import DashboardContent from './Partials/Content.vue'
import ContentFooter from './Partials/ContentFooter.vue'

export default {
    name:'DefaultLayout',
    components:{
        NavigationHeader,
        DashboardContent,
        // Sidebar,
        ContentFooter
    }
}
</script>