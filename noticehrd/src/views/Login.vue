<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height main"
        fluid pa-0
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>HRD Notice</v-toolbar-title>
                <v-divider
                class="mx-4"
                inset
                vertical
                ></v-divider>
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer />
                <v-btn fab icon to="/"><v-icon>mdi-home</v-icon></v-btn>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="user"
                    label="Login"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                  />

                  <v-text-field
                    v-model="pass"
                    label="Password"
                    prepend-icon="mdi-lock"
                    type="password"
                    @keyup.enter="onLogin()"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn @click="onLogin()" color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
    data() {
        return {
            user: '',
            pass: ''
        }
    },
    methods: {
        onLogin() {
            if(this.user === '0320' && this.pass === '0320' || this.user === 'neth' && this.pass === 'neth'){
                this.CHANGE_USER_INFO({allow: true, user: this.user, pass: this.pass})
                this.$router.push('/admin')
            }else{
                alert('Wrong user name and password')
            }
        }
    }
}
</script>