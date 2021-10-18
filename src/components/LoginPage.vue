!<template>
  <div class="login">
    <v-container class="wrapper">
      <v-layout row wrap justify-center style="margin-top: 100px;">
        <v-card elevation="20" width="400px" class="py-5 px-3 rounded-lg">
          <v-layout row wrap>
            <v-flex xs12>
              <img
                src="https://static.wixstatic.com/media/70a07f_ca7d4aba5d1a4ff5ba1c2246dbe340fb~mv2.png/v1/fill/w_200,h_80,al_c,q_85,usm_0.66_1.00_0.01/logo_12.webp"
                alt="mceasy-logo"
              />
            </v-flex>
            <v-flex xs12>
              <div class="color-space"></div>
            </v-flex>
            <v-flex xs12>
              <h2 class="font-weight-medium">LOGIN</h2>
            </v-flex>
            <v-form ref="form" style="width: 100%">
              <v-flex xs12 class="px-3">
                <v-text-field
                  placeholder="Enter username"
                  :rules="rules.username"
                  label="Username"
                  append-icon="mdi-account"
                  v-model="username"
                  class="px-5"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 class="px-3">
                <v-text-field
                  placeholder="Enter password"
                  :rules="rules.password"
                  label="Password"
                  :type="show ? 'text' : 'password'"
                  @click:append="show = !show"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  v-model="password"
                  class="px-5 mb-5"
                ></v-text-field>
              </v-flex>
            </v-form>
            <v-flex xs12 class="px-5 mb-5">
              <v-btn
                @click="login"
                dark
                elevation="0"
                height="40px"
                width="340px"
                small
                color="#f95f5f"
                :to="passed && '/customers'"
                >L o g i n</v-btn
              >
            </v-flex>
          </v-layout>
        </v-card>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'loginPage',
  data () {
    return {
      show: false,
      user: [
        {
          username: 'Hamdani',
          password: 'eee'
        }
      ],
      passed: false,
      username: '',
      password: '',
      rules: {
        username: [v => !!v || 'Username should not be empty'],
        password: [v => !!v || 'Password should not be empty']
      }
    }
  },
  methods: {
    login () {
        if (this.$refs.form.validate()) {
            if (!this.user.find(i => i.username === this.username)) {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Account Not Found',
              })
            }
            if (this.user.find(i => i.username === this.username) && !this.user.find(i => i.password === this.password)) {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Wrong Password',
              })
            }
            if (this.user.find(i => i.username === this.username) && this.user.find(i => i.password === this.password)) {
              this.passed = true
            }
        }
    }
  }
}
</script>

<style lang="scss">
.login {
  background-image: url('https://images.pexels.com/photos/2800121/pexels-photo-2800121.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260');
  display: flex;
  background-size: cover;
  height: 100%;
  align-items: center;

  img {
    width: 120px;
    margin: 10px auto 20px auto;
  }

  h2 {
    color: #979797;
  }

  .color-space {
    height: 60px;
    width: 100%;
    margin-bottom: 20px;
    background-color: #f95f5f;
  }
}
</style>
