<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <HeaderComponent />
    <div class="container-fluid flex-grow-1">
      <div class="row">
        <div class="col-12 col-md-3 col-lg-2 px-0">
          <SidebarComponent />
        </div>
        <div class="col-12 col-md-9 col-lg-10">
          <main class="flex-grow-1">
            <RouterView />
          </main>
        </div>
      </div>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import SidebarComponent from './components/SidebarComponent.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
