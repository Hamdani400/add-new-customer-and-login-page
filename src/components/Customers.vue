<template>
  <div class="d-flex wrapper">
    <side-nav></side-nav>
    <div class="main-bg pt-2">
      <v-container class="pa-4">
        <v-layout row wrap class="pa-4">
          <v-flex xs8 class="d-block">
            <h2 class="white--text">Customers</h2>
            <h3 class="body-2">Manage your customers here</h3>
          </v-flex>
          <v-flex xs4 class="profile">
            <v-icon class="mr-5" color="white">mdi-bell-outline</v-icon>
            <v-avatar class="mr-5 ml-1">
              <img
                src="https://thumbs.dreamstime.com/b/face-portrait-very-happy-man-against-aqua-marine-blue-face-portrait-very-happy-man-against-aqua-marine-blue-color-background-204349508.jpg"
                alt="avatar-pic"
              />
            </v-avatar>
            <h2 class="body-1 ml-1 mr-5 white--text">Hamdani</h2>
            <v-icon color="white">mdi-chevron-down</v-icon>
          </v-flex>
        </v-layout>
        <v-layout class="px-4" row wrap>
          <add-new-user-form :close-form="closeForm" :submit="submit" v-if="isAddingUser"></add-new-user-form>
          <v-card
            width="100%"
            height="80vh"
            class="pt-5 px-3 main-card"
            style="overflow-y: scroll; overflow-x: hidden"
            v-if="!isAddingUser"
          >
            <v-layout row wrap class="mb-4">
              <v-flex xs6 justify-start>
                <v-card-title class="title-card" primary-title>
                  Customers List
                </v-card-title>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  solo
                  flat
                  background-color="#F5F5F5"
                  placeholder="Search customer"
                  class="search-input pt-3"
                  single-line
                  hide-details
                  rounded
                  prepend-inner-icon="mdi-magnify"
                  v-model="search"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-divider class="mb-4"></v-divider>
            <v-layout row wrap>
              <v-flex xs3 justify-start class="pl-4 pt-3">
                <span
                  class="body-2 primary-text font-weight-medium mr-4 pt-2"
                  color="#292560"
                >
                  Gender</span
                >
                <v-autocomplete
                  dense
                  outlined
                  flat
                  single-line
                  class="filter"
                  append-icon="mdi-chevron-down"
                  placeholder="All Genders"
                  @change="onChangeFilterGender()"
                  :items="genders"
                  v-model="gender"
                >
                </v-autocomplete>
              </v-flex>
              <v-flex xs6 justify-start class="pl-4 pt-3">
                <span
                  class="body-2 primary-text font-weight-medium mr-4 pt-2"
                  color="#292560"
                >
                  Address</span
                >
                <v-autocomplete
                  dense
                  outlined
                  flat
                  single-line
                  clearable
                  class="filter address"
                  append-icon="mdi-chevron-down"
                  placeholder="All country, province, city, region, postal code"
                  @change="onChangeFilterAddress()"
                  :items="addressFilter"
                  v-model="address"
                >
                </v-autocomplete>
              </v-flex>
              <v-flex xs3 justify-end class="pr-4 pt-3">
                <v-btn
                  @click="isAddingUser = true"
                  class="text-capitalize"
                  rounded
                  dark
                  flat
                  elevation="0"
                  height="35px"
                  width="150px"
                  small
                  color="#f95f5f"
                >
                  <v-icon left color="white">mdi-plus</v-icon>
                  <span class="caption white--text">Add Customer</span></v-btn
                >
              </v-flex>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-data-table
                    v-model="selected"
                    :headers="headers"
                    :items="items"
                    :search="search"
                    :single-select="singleSelect"
                    :page.sync="pagination.page"
                    :items-per-page="pagination.itemsPerPage"
                    height="290"
                    fixed-header
                    item-key="name"
                    class="table"
                    show-select
                    hide-default-footer
                  >
                    <template v-slot:item.actions="{ item }">
                      <v-icon small class="mr-2" @click="editItem(item)">
                        mdi-pencil
                      </v-icon>
                      <v-icon small @click="deleteItem(item)">
                        mdi-delete
                      </v-icon>
                    </template>
                  </v-data-table>
                </v-flex>
              </v-layout>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs6 class="d-flex pt-3" justify-start>
                <span class="body-2 pt-2 mr-3 pl-3">Showing</span>
                <v-select
                dense
                outlined
                flat
                single-line
                class="filter page"
                v-model="pagination.itemsPerPage"
                :items="[5, 10, 15, 20]"
                >
                </v-select>
                <span class="body-2 pt-2" style="margin-right: 310px;">of {{ items.length }}</span>
              </v-flex>
              <v-flex xs6 justify-end class="pt-3">
                     <v-pagination
                          class="pagination"
                          circle
                          text
                          elevation="0"
                          color="#f95f5f"
                          v-model="pagination.page"
                          :length="paginationLength"
                        ></v-pagination>
              </v-flex>
            </v-layout>
          </v-card>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
import SideNav from './SideNav.vue'
import AddNewUserForm from './AddNewUserForm.vue'
import Swal from 'sweetalert2'

export default {
  components: { SideNav, AddNewUserForm },
  name: 'Dashboard',
  data () {
    return {
      search: '',
      singleSelect: '',
      gender: '',
      address: '',
      editedIndex: '',
      isAddingUser: false,
      addressFilter: [],
      pagination: {
        page: 1,
        len: 5,
        itemsPerPage: 5,
      },
      genders: ['Male', 'Female'],
      selected: [],
      headers: [
        {
          text: 'ID',
          align: 'start',
          width: '100px',
          value: 'id'
        },
        { text: 'Name', value: 'name', sortable: true, width: '150px' },
        { text: 'Gender', value: 'gender', width: '150px' },
        { text: 'Address', value: 'address', width: '300px' },
        { text: 'Phone', value: 'phone', width: '100px' },
        { text: 'Actions', value: 'actions', width: '100px', sortable: false }
      ],
      allItems: [
        {
          name: 'Hamdani Dinul Haq',
          id: 15911343,
          gender: 'Male',
          address: 'Kepel Kemiri, RT 01 RW 01, Kota Pasuruan, Jawa Timur',
          phone: '089776611331'
        },
        {
          name: 'Budi Umam',
          id: 15911343,
          gender: 'Male',
          address: 'Jl. Pandega Duta 1, Yogyakarta',
          phone: '089776611331'
        },
        {
          name: 'Ucup',
          id: 15911343,
          gender: 'Male',
          address: 'Kepel Kemiri, RT 01 RW 01, Kota Pasuruan, Jawa Timur',
          phone: '089776611331'
        },
        {
          name: 'Fatimah',
          id: 15911343,
          gender: 'Female',
          address: 'Tegalboto, Jember, Jawa Timur',
          phone: '089776611331'
        },
        {
          name: 'Abdul Aziz',
          id: 15911343,
          gender: 'Male',
          address: 'Kepel Kemiri, RT 01 RW 01, Kota Pasuruan, Jawa Timur',
          phone: '089776611331'
        },
        {
          name: 'Alfa Zidan',
          id: 15911343,
          gender: 'Male',
          address: 'Kepel Kemiri, RT 01 RW 01, Kota Pasuruan, Jawa Timur',
          phone: '089776611331'
        },
        {
          name: 'Nuzulul Imam',
          id: 15911343,
          gender: 'Male',
          address: 'Kepel Kemiri, RT 01 RW 01, Kota Pasuruan, Jawa Timur',
          phone: '089776611331'
        },
        {
          name: 'Nurul Qomariyah',
          id: 15911343,
          gender: 'Female',
          address: 'Kepel Kemiri, RT 01 RW 01, Kota Pasuruan, Jawa Timur',
          phone: '089776611331'
        },
        {
          name: 'Faiza Natali',
          id: 15911343,
          gender: 'Female',
          address: 'Kepel Kemiri, RT 01 RW 01, Kota Pasuruan, Jawa Timur',
          phone: '089776611331'
        },
        {
          name: 'Christian Pulisic',
          id: 15911343,
          gender: 'Male',
          address: 'Kepel Kemiri, RT 01 RW 01, Kota Pasuruan, Jawa Timur',
          phone: '089776611331'
        },
        {
          name: 'Bobby Satria',
          id: 15911343,
          gender: 'Male',
          address: 'Kepel Kemiri, RT 01 RW 01, Kota Pasuruan, Jawa Timur',
          phone: '089776611331'
        },
        {
          name: 'Khoirul Ulum',
          id: 15911343,
          gender: 'Male',
          address: 'Kepel Kemiri, RT 01 RW 01, Kota Pasuruan, Jawa Timur',
          phone: '089776611331'
        },
        {
          name: 'Attalaqia',
          id: 15911343,
          gender: 'Female',
          address: 'Kepel Kemiri, RT 01 RW 01, Kota Pasuruan, Jawa Timur',
          phone: '089776611331'
        },
        {
          name: 'Muhammad Sobir',
          id: 15911343,
          gender: 'Male',
          address: 'Kepel Kemiri, RT 01 RW 01, Kota Pasuruan, Jawa Timur',
          phone: '089776611331'
        },
        {
          name: 'Natalia',
          id: 15911343,
          gender: 'Female',
          address: 'Kepel Kemiri, RT 01 RW 01, Kota Pasuruan, Jawa Timur',
          phone: '089776611331'
        },
        {
          name: 'Gwen Stacy',
          id: 15911343,
          gender: 'Female',
          address: 'Kepel Kemiri, RT 01 RW 01, Kota Pasuruan, Jawa Timur',
          phone: '089776611331'
        },
        {
          name: 'Ronaldo Nazario',
          id: 15911343,
          gender: 'Male',
          address: 'Kepel Kemiri, RT 01 RW 01, Kota Pasuruan, Jawa Timur',
          phone: '089776611331'
        },
        {
          name: 'Michael Carrick',
          id: 15911343,
          gender: 'Male',
          address: 'Kepel Kemiri, RT 01 RW 01, Kota Pasuruan, Jawa Timur',
          phone: '089776611331'
        },
        {
          name: 'Ratna Sari',
          id: 15911343,
          gender: 'Female',
          address: 'Kepel Kemiri, RT 01 RW 01, Kota Pasuruan, Jawa Timur',
          phone: '089776611331'
        },
        {
          name: 'Karen Karina',
          id: 15911343,
          gender: 'Female',
          address: 'Kepel Kemiri, RT 01 RW 01, Kota Pasuruan, Jawa Timur',
          phone: '089776611331'
        },
        {
          name: 'John Doe',
          id: 21323311343,
          gender: 'Male',
          address: 'Kepel Kemiri, RT 01 RW 01, Kota Pasuruan, Jawa Timur',
          phone: '08977664231'
        }
      ],
      items: [
        {
          name: 'Hamdani Dinul Haq',
          id: 15911343,
          gender: 'Male',
          address: 'Kepel Kemiri, RT 01 RW 01, Kota Pasuruan, Jawa Timur',
          phone: '089776611331'
        },
        {
          name: 'Budi Umam',
          id: 15911343,
          gender: 'Male',
          address: 'Jl. Pandega Duta 1, Yogyakarta',
          phone: '089776611331'
        },
        {
          name: 'Ucup',
          id: 15911343,
          gender: 'Male',
          address: 'Kepel Kemiri, RT 01 RW 01, Kota Pasuruan, Jawa Timur',
          phone: '089776611331'
        },
        {
          name: 'Fatimah',
          id: 15911343,
          gender: 'Female',
          address: 'Tegalboto, Jember, Jawa Timur',
          phone: '089776611331'
        },
        {
          name: 'Abdul Aziz',
          id: 15911343,
          gender: 'Male',
          address: 'Kepel Kemiri, RT 01 RW 01, Kota Pasuruan, Jawa Timur',
          phone: '089776611331'
        },
        {
          name: 'Alfa Zidan',
          id: 15911343,
          gender: 'Male',
          address: 'Kepel Kemiri, RT 01 RW 01, Kota Pasuruan, Jawa Timur',
          phone: '089776611331'
        },
        {
          name: 'Nuzulul Imam',
          id: 15911343,
          gender: 'Male',
          address: 'Kepel Kemiri, RT 01 RW 01, Kota Pasuruan, Jawa Timur',
          phone: '089776611331'
        },
        {
          name: 'Nurul Qomariyah',
          id: 15911343,
          gender: 'Female',
          address: 'Kepel Kemiri, RT 01 RW 01, Kota Pasuruan, Jawa Timur',
          phone: '089776611331'
        },
        {
          name: 'Faiza Natali',
          id: 15911343,
          gender: 'Female',
          address: 'Kepel Kemiri, RT 01 RW 01, Kota Pasuruan, Jawa Timur',
          phone: '089776611331'
        },
        {
          name: 'Christian Pulisic',
          id: 15911343,
          gender: 'Male',
          address: 'Kepel Kemiri, RT 01 RW 01, Kota Pasuruan, Jawa Timur',
          phone: '089776611331'
        },
        {
          name: 'Bobby Satria',
          id: 15911343,
          gender: 'Male',
          address: 'Kepel Kemiri, RT 01 RW 01, Kota Pasuruan, Jawa Timur',
          phone: '089776611331'
        },
        {
          name: 'Khoirul Ulum',
          id: 15911343,
          gender: 'Male',
          address: 'Kepel Kemiri, RT 01 RW 01, Kota Pasuruan, Jawa Timur',
          phone: '089776611331'
        },
        {
          name: 'Attalaqia',
          id: 15911343,
          gender: 'Female',
          address: 'Kepel Kemiri, RT 01 RW 01, Kota Pasuruan, Jawa Timur',
          phone: '089776611331'
        },
        {
          name: 'Muhammad Sobir',
          id: 15911343,
          gender: 'Male',
          address: 'Kepel Kemiri, RT 01 RW 01, Kota Pasuruan, Jawa Timur',
          phone: '089776611331'
        },
        {
          name: 'Natalia',
          id: 15911343,
          gender: 'Female',
          address: 'Kepel Kemiri, RT 01 RW 01, Kota Pasuruan, Jawa Timur',
          phone: '089776611331'
        },
        {
          name: 'Gwen Stacy',
          id: 15911343,
          gender: 'Female',
          address: 'Kepel Kemiri, RT 01 RW 01, Kota Pasuruan, Jawa Timur',
          phone: '089776611331'
        },
        {
          name: 'Ronaldo Nazario',
          id: 15911343,
          gender: 'Male',
          address: 'Kepel Kemiri, RT 01 RW 01, Kota Pasuruan, Jawa Timur',
          phone: '089776611331'
        },
        {
          name: 'Michael Carrick',
          id: 15911343,
          gender: 'Male',
          address: 'Kepel Kemiri, RT 01 RW 01, Kota Pasuruan, Jawa Timur',
          phone: '089776611331'
        },
        {
          name: 'Ratna Sari',
          id: 15911343,
          gender: 'Female',
          address: 'Kepel Kemiri, RT 01 RW 01, Kota Pasuruan, Jawa Timur',
          phone: '089776611331'
        },
        {
          name: 'Karen Karina',
          id: 15911343,
          gender: 'Female',
          address: 'Kepel Kemiri, RT 01 RW 01, Kota Pasuruan, Jawa Timur',
          phone: '089776611331'
        },
        {
          name: 'John Doe',
          id: 21323311343,
          gender: 'Male',
          address: 'Kepel Kemiri, RT 01 RW 01, Kota Pasuruan, Jawa Timur',
          phone: '08977664231'
        }
      ]
    }
  },
  computed: {
    paginationLength() {
      return Math.ceil(this.items.length / this.pagination.itemsPerPage)
    }
  },
  mounted() {
    this.getFilterAddress()
  },
  methods: {
    onChangeFilterGender() {
      if (this.address) {
        this.items = this.items.filter(item => item.gender === this.gender)
      }
      if (!this.address) {
        this.items = this.allItems.filter(item => item.gender === this.gender)
      }
    },
    onChangeFilterAddress() {
      if (this.gender) {
        this.items = this.items.filter(item => item.address === this.address)
      }
      if (!this.gender) {
        this.items = this.allItems.filter(item => item.address === this.address)
      }
      if (!this.address) {
        this.items = this.allItems
      }
    },
    deleteItem(item) {
      Swal.fire({
        title: 'Are you sure to delete this data?',
        text: ``,
        type: 'warning',
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonColor: 'primary',
        cancelButtonColor: '#EB4747',
        confirmButtonText: 'Sure',
        cancelButtonText: 'Cancel',
      }).then(result => {
        if(result.value) {
          this.editedIndex = this.items.indexOf(item)
          this.items.splice(this.editedIndex, 1)
          Swal.fire({
                  type: 'success',
                  title: 'Deleted',
                  text: 'Data has been deleted',
                })
                this.editedIndex = -1
        }
      })
    },
    closeForm () {
      this.isAddingUser = false
    },
    submit(item) {
      this.items.unshift(item)
    },
    getFilterAddress() {
      this.addressFilter = this.items.map(i => i.address)
    }
  }
}
</script>

<style lang="scss">
.wrapper {
  height: 100%;

  .main-bg {
    background-color: #292560;
    width: 100%;
    height: 100%;

    .main-card {
      &::-webkit-scrollbar {
        width: 3px;
        background-color: rgb(218, 218, 218);
      }
      &::-webkit-scrollbar-thumb {
        width: 3px;
        background-color: #9e9e9e;
      }
    }

    .table {
      &::-webkit-scrollbar {
        width: 3px;
        background-color: rgb(218, 218, 218);
      }
      &::-webkit-scrollbar-thumb {
        width: 3px;
        background-color: #9e9e9e;
      }
    }

    .primary-text {
      color: #292560;
    }

    h3 {
      color: rgb(189, 189, 189);
    }

    .profile {
      display: flex;
      align-items: center;
      justify-content: end;
    }

    .title-card {
      letter-spacing: 0.5px;
      font-weight: 700;
      color: #292560;
    }

    .search-input {
      width: 300px;

      .v-input__control {
        margin-right: 30px;

        .v-input__slot {
          min-height: 0px !important;
          height: 40px !important;
          border-radius: 8px;
        }
      }
    }

    .filter {
      font-size: 0.9rem;
      width: 10px !important;
      min-width: 10px;

      &.address {
        .v-input__slot {
          width: 100%;
        }
      }

      &.page {
        .v-input__slot {
          width: 75px;
        }
      }

      fieldset {
        border: 1.8px solid #dfdede;
      }

      .v-input__slot {
        min-height: 0px !important;
        height: 35px !important;
        border-radius: 8px;
        width: 130px;

        .v-input__append-inner {
          margin-top: 5px;
        }
      }
    }
  }
}
.v-menu__content {
  box-shadow: none !important;
  border: 1.8px solid #dfdede;
  border-radius: 5px !important;

  .v-list-item {
    margin-left: 5px;
  }
}
</style>
