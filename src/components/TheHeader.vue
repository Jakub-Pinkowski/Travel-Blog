<template>
    <nav class="navbar navbar-expand-md">
        <div class="container-fluid">
            <router-link class="nav-link" to="/">
                <TheLogo />
            </router-link>
            <div class="collapse navbar-collapse navbarSupportedContent">
                <ul class="navbar-nav mb-2 mb-lg-0">
                    <li v-for="view in views" class="nav-item">
                        <router-link class="nav-link" :to="view.route">{{
                            view.name
                        }}</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { useViewStore } from '@/stores/views'

const viewStore = useViewStore()
const views = viewStore.views
</script>

<style scoped lang="scss">
.nav-link {
    margin: 0.5rem 1.2rem;
    font-size: 1.2rem;
    color: var(--main-bg-color);
    transition: all 0.3s ease-out;
}

.nav-link:hover {
    color: var(--accent-color);
}

.nav-link svg {
    fill: var(--dark-accent);
}

.nav-link:hover svg {
    fill: var(--accent-color);
}

.navbarSupportedContent {
    display: flex;
    justify-content: flex-end;

    li {
        font-weight: 400;
    }
}
</style>
