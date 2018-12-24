<template>
  <v-layout align-center>
          <v-menu >
            <v-btn slot="activator" dark icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile v-for="(item, i) in items" :key="i" @click="menuClick(item.target)">
                <v-list-tile-title >{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
  </v-layout>
</template>

<script>
    import setAuthorizationToken from '../utils/setAuthToken'
    export default {
        name: 'UserMenu',
        data: () => ({
            items: [
                { title: 'My profile', target: 'profile' },
                { title: 'Settings', target: 'settings' },
                { title: 'Logout', target: 'logout' }
            ]
        }),
        methods: {
            menuClick(target) {
                if (target === 'logout') {
                    setAuthorizationToken(false)
                    this.$router.push('/')
                    this.$emit('userLoggedOut')
                } else if (target === 'settings') {
                    this.$router.push('/settings')
                } else if (target === 'profile') {
                    this.$router.push('/user')
                }
            }
        }
    }
  
</script>
