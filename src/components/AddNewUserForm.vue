<template>
  <v-card
    width="100%"
    height="80vh"
    class="pt-5 px-3 main-card"
    style="overflow-y: scroll; overflow-x: hidden"
  >
    <v-layout class="d-flex pl-3 pt-3" style="margin-bottom: 30px;" row wrap>
      <h3
        style="color: #f95f5f; cursor: pointer;"
        class="body-1 font-weight-bold"
        @click="close()"
      >
        Customers
      </h3>
      <v-icon color="">mdi-chevron-right</v-icon>
      <h3 style="color: #292560;" class="body-1 font-weight-bold">
        Add New Customer
      </h3>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs3>
        <v-layout column wrap>
          <v-flex xs3>
            <img :src="image" v-if="image" alt="profile-photo" width="50px" />
            <div v-if="!image" class="picture-holder mb-3">
              <v-icon
                style="margin: 30px 0px 0px 73px;"
                x-large
                color="rgb(219, 219, 219)"
                >mdi-image</v-icon
              >
              <span
                class="caption font-weight-light pl-5"
                style="margin-left: 33px;"
                >Browse Photo</span
              >
              <br />
              <span class="caption font-weight-light ml-5 pl-5"
                >(JPEG, JPG, PNG)</span
              >
            </div>
          </v-flex>
          <v-flex xs2>
            <v-btn
              dark
              elevation="0"
              height="40px"
              width="70%"
              @click="addFile"
              small
              color="rgb(240, 240, 240)"
              class="text-capitalize btn upload mb-3"
              >Upload</v-btn
            >
            <input
              type="file"
              ref="file"
              @change="handleFileUpload"
              style="display: none;"
            />
          </v-flex>
          <v-flex xs2 style="margin-top: -62px;">
            <v-btn
              @click="removePhoto"
              dark
              elevation="0"
              height="40px"
              width="70%"
              small
              color="rgb(240, 240, 240)"
              class="text-capitalize btn upload"
              >Remove</v-btn
            >
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs4 class="px-5">
        <v-layout column wrap>
          <v-flex xs1>
            <div class="d-block">
              <div class="d-flex justify-space-between mb-2">
                <span class="caption">FULL NAME</span>
                <span class="caption red--text">*required</span>
              </div>
              <v-text-field
                placeholder="Enter Full Name"
                v-model="name"
                outlined
                :rules="rules.name"
                class="input-text"
              ></v-text-field>
            </div>
          </v-flex>
          <v-flex xs1 style="margin-top:-12px;" justify-start>
            <div class="d-block">
              <div style="width: 150px;" class="d-flex justify-space-between">
                <span class="caption">GENDER</span>
                <span class="caption red--text">*required</span>
              </div>
              <v-radio-group
                v-model="gender"
                dense
                row
                style="margin-top: -1px;"
              >
                <v-radio label="Male" value="Male"></v-radio>
                <v-radio label="Female" value="Female"></v-radio>
              </v-radio-group>
            </div>
          </v-flex>
          <v-flex xs1 style="margin-top:-5px;">
            <div class="d-block">
              <div class="d-flex justify-space-between mb-2">
                <span class="caption">DATE OF BIRTH</span>
                <span class="caption red--text">*required</span>
              </div>
              <v-menu offset-y :close-on-content-click="false">
                <template v-slot:activator="{ on }">
                  <v-text-field
                    placeholder="dd/mm/yyyy"
                    readonly
                    v-on="on"
                    v-model="date"
                    :rules="rules.date"
                    outlined
                    class="input-text"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date"></v-date-picker>
              </v-menu>
            </div>
          </v-flex>
          <v-flex xs1 style="margin-top:-14px;">
            <div class="d-block">
              <div class="d-flex justify-space-between mb-2">
                <span class="caption">IDENTITY TYPE</span>
                <span class="caption red--text">*required</span>
              </div>
              <v-select
                placeholder="KTP/SIM/OTHER"
                v-model="identityType"
                :rules="rules.identity"
                :value="itemDetail.identityType"
                outlined
                :items="identitytypes"
                class="input-text"
              ></v-select>
            </div>
          </v-flex>
          <v-flex xs1 style="margin-top:-15px;">
            <div class="d-block">
              <div class="d-flex justify-space-between mb-2">
                <span class="caption">IDENTITY NUMBER</span>
                <span class="caption red--text">*required</span>
              </div>
              <v-text-field
                placeholder="Enter identity number"
                v-model="identityNumber"
                :rules="rules.identityNumber"
                outlined
                class="input-text"
              ></v-text-field>
            </div>
          </v-flex>
          <v-flex xs1 style="margin-top:-15px;">
            <div class="d-block">
              <div class="d-flex justify-space-between mb-2">
                <span class="caption">E-MAIL</span>
                <span class="caption red--text">*required</span>
              </div>
              <v-text-field
                placeholder="Enter email"
                v-model="email"
                :rules="[rules.email, rules.emailEmpty]"
                outlined
                class="input-text"
              ></v-text-field>
            </div>
          </v-flex>
          <v-flex xs1 style="margin-top:-15px;">
            <div class="d-block">
              <div class="d-flex justify-space-between mb-2">
                <span class="caption">PHONE NUMBER</span>
                <span class="caption red--text">*required</span>
              </div>
              <v-text-field
                placeholder="Enter phone number"
                v-model="phone"
                :rules="rules.phone"
                outlined
                class="input-text"
                ><v-select></v-select
              ></v-text-field>
            </div>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs4 class="pt-4">
        <v-layout column wrap>
          <v-flex xs1 style="margin-top:-15px;">
            <div class="d-block">
              <div class="d-flex justify-space-between mb-2">
                <span class="caption">ADRESS</span>
                <span class="caption red--text">*required</span>
              </div>
              <v-textarea
                no-resize
                placeholder="Enter address"
                v-model="address"
                :rules="rules.address"
                outlined
                class="input-text area"
              ></v-textarea>
            </div>
          </v-flex>
          <v-flex xs1 style="margin-top:-15px;">
            <div class="d-block">
              <div class="d-flex justify-space-between mb-2">
                <span class="caption">DETAIL ADRESS</span>
                <span class="caption red--text">*required</span>
              </div>
              <v-textarea
                no-resize
                placeholder="Enter detail address: (Street, Block, Number, etc)"
                v-model="detailAddress"
                :rules="rules.detailAddress"
                outlined
                class="input-text detail-area"
              ></v-textarea>
            </div>
          </v-flex>
          <v-flex xs1 style="margin-top:-15px;" class="px-5">
            <div class="d-block">
              <span class="caption">Select pin from maps</span>
              <img
                style="width: 100%; margin-top: -0.5px;"
                src="https://i.pinimg.com/originals/82/dd/4c/82dd4c094377e2bff9d9786d106c2500.png"
                alt="map"
              />
            </div>
          </v-flex>
          <v-flex xs1 style="margin-top:-15px;">
            <div class="d-block">
              <div class="d-flex justify-space-between mb-2">
                <span class="caption">INSTAGRAM</span>
              </div>
              <v-text-field
                placeholder="Enter Instagram"
                v-model="instagram"
                outlined
                class="input-text"
              ></v-text-field>
              <v-btn
                @click="updateItem"
                class="text-capitalize mb-3"
                style="margin-top:-15px; margin-left: 150px"
                rounded
                dark
                flat
                elevation="0"
                height="35px"
                width="150px"
                small
                color="#f95f5f"
                v-if="isEditUser"
              >
                <span class="caption white--text">Edit Customer</span></v-btn
              >
              <v-btn
                v-if="!isEditUser"
                @click="addItem"
                class="text-capitalize mb-3"
                style="margin-top:-15px; margin-left: 150px"
                rounded
                dark
                flat
                elevation="0"
                height="35px"
                width="150px"
                small
                color="#f95f5f"
              >
                <span class="caption white--text">Add Customer</span></v-btn
              >
            </div>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
// const axios = require('axios');

export default {
  name: 'AddNewUserForm',
  props: ['closeForm', 'submit', 'itemDetail', 'isEditUser', 'update'],
  data () {
    return {
      name: '',
      gender: '',
      date: '',
      identityNumber: '',
      email: '',
      phone: '',
      address: '',
      instagram: '',
      detailAddress: '',
      identityType: '',
      image: null,
      identitytypes: ['KTP', 'SIM', 'Others'],
      rules: {
        name: [v => !!v || 'Name is required'],
        date: [v => !!v || 'Date of birth is required'],
        identity: [v => !!v || 'Identity type is required'],
        identityNumber: [v => !!v || 'Identity number is required'],
        emailEmpty: [v => !!v || 'Email is required'],
        phone: [v => !!v || 'Phone number is required'],
        address: [v => !!v || 'Address is required'],
        detailAddress: [v => !!v || 'Detail address is required'],
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      }
    }
  },
  mounted () {
    this.getDetailData()
  },
  methods: {
    getDetailData () {
      if (this.itemDetail) {
        this.name = this.itemDetail.name
        this.gender = this.itemDetail.gender
        this.image = this.itemDetail.image
        this.date = this.itemDetail.date
        this.identityNumber = this.itemDetail.identityNumber
        this.email = this.itemDetail.email
        this.phone = this.itemDetail.phone
        this.address = this.itemDetail.address
        this.instagram = this.itemDetail.instagram
        this.detailAddress = this.itemDetail.detailAddress
        this.identityType = this.itemDetail.identityType
      }
    },
    addFile () {
      this.$refs.file.click()
    },
    handleFileUpload (e) {
      this.image = URL.createObjectURL(e.target.files[0])
    },
    removePhoto () {
      this.image = null
    },
    close () {
      this.closeForm()
    },
    addItem () {
      this.submit({
        id: 99877313,
        name: this.name,
        gender: this.gender,
        address: this.address,
        phone: this.phone,
        date: this.date,
        identityNumber: this.identityNumber,
        email: this.email,
        instagram: this.instagram,
        detailAddress: this.detailAddress,
        image: this.image,
        identityType: this.identityType
      })
      this.closeForm()
    },
    updateItem () {
      this.update({
        id: 99877313,
        name: this.name,
        gender: this.gender,
        address: this.address,
        phone: this.phone,
        date: this.date,
        identityNumber: this.identityNumber,
        email: this.email,
        instagram: this.instagram,
        detailAddress: this.detailAddress,
        image: this.image,
        identityType: this.identityType
      })
      this.closeForm()
    }
  }
}
</script>

<style lang="scss">
.input-text {
  font-size: 0.9rem;
  width: 300px !important;
  min-width: 100%;

  &.area {
    .v-input__slot {
      min-height: 0px !important;
      height: 100px !important;
      border-radius: 8px;
      width: 100%;
    }

    textarea {
      font-size: 0.8rem;
      margin-top: 0;
    }
  }

  &.detail-area {
    .v-input__slot {
      min-height: 0px !important;
      height: 80px !important;
      border-radius: 8px;
      width: 100%;
    }
    textarea {
      font-size: 0.8rem;
      margin-top: 0;
    }
  }

  fieldset {
    border: 1.8px solid #dfdede;
  }

  .v-input__slot {
    min-height: 0px !important;
    height: 35px !important;
    border-radius: 8px;
    width: 100%;

    .v-input__append-inner {
      margin-top: 5px;
    }
  }
}

.picture-holder {
  width: 70%;
  height: 150px;
  border-radius: 4px;
  background-color: rgb(240, 240, 240);
}

.btn {
  border-radius: 10px;
  &.upload {
    .v-btn__content {
      color: rgb(155, 155, 155);
      font-weight: 300;
      font-size: 0.9rem;
      letter-spacing: 1px;
      font-family: 'Roboto';
    }
  }
}
</style>
