<template>
  <v-card height="100%" width="300">
    <v-navigation-drawer width="300" permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="d-flex justify-content-center">
            <img
              src="https://static.wixstatic.com/media/70a07f_ca7d4aba5d1a4ff5ba1c2246dbe340fb~mv2.png/v1/fill/w_200,h_80,al_c,q_85,usm_0.66_1.00_0.01/logo_12.webp"
              alt="mceasy-logo"
            />
          </v-list-item-title>
          <v-list-item-subtitle class="mb-5">
            <v-list-item-icon class="ma-0 pt-1 mr-4">
              <v-icon color="#A2A6B1" outline>mdi-home-outline</v-icon>
            </v-list-item-icon>
            <span> Dashboard</span>
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <span class="caption">
              MAIN MENU
            </span>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list dense nav>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          link
          class="mb-3"
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon medium color="#A2A6B1">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title
              ><span>{{ item.text }}</span></v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list-item-subtitle style="margin-left: 65px;">
        <span class="caption">
          HELP
        </span>
      </v-list-item-subtitle>

      <v-list dense nav>
        <v-list-item
          v-for="(item, index) in help"
          :key="index"
          link
          class="mb-3"
        >
          <v-list-item-icon>
            <v-icon medium color="#A2A6B1">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title
              ><span>{{ item.text }}</span></v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  name: 'SideNav',
  data () {
    return {
      items: [
        {
          text: 'Analytics',
          icon: 'mdi-chart-line',
          route: '/analytics'
        },
        {
          text: 'Customers',
          icon: 'mdi-account-multiple',
          route: '/customers'
        },
        {
          text: 'Products',
          icon: 'mdi-tag-outline',
          route: '/products'
        },
        {
          text: 'Orders',
          icon: 'mdi-cart-outline',
          route: '/orders'
        },
        {
          text: 'Reports',
          icon: 'mdi-file-chart-outline',
          route: '/reports'
        }
      ],
      help: [
        {
          text: 'Settings',
          icon: 'mdi-cog',
          route: '/settings'
        },
        {
          text: 'Support',
          icon: 'mdi-account-question',
          route: '/support'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
img {
  width: 150px;
  margin: 20px auto 30px auto;
}

span {
  font-size: 1rem;
  font-weight: 450;
  letter-spacing: 0.3px;
  color: #a2a6b1;
}

.v-list-item__subtitle {
  display: flex;
  align-items: end;
  margin-left: 48px;
}

.v-list {
  .v-list-item--link {
    display: flex;
    align-items: end;
    margin-left: 48px;
  
  &.v-list-item--active {
    color: rgb(206, 206, 206);
    border-left: 5px solid #f95f5f;
    
      span {
        color: #f95f5f;
      }

      .v-icon {
        color: #f95f5f !important;
      }
  }
  }

}
</style>
