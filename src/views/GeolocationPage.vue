<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button @click="logout">Logout</ion-button>
          </ion-buttons>
          <ion-title>GÉOLOCALISATION</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="clearLocations">Effacer</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding">
        <div class="geo-wrapper">
          <div v-for="(pos, index) in locations" :key="index" class="location-item">
            <ion-text>
              <ion-button fill="outline" expand="block">
                Position {{ index + 1 }}: <br>
                Latitude: {{ pos.latitude }}<br>
                Longitude: {{ pos.longitude }}
              </ion-button>
            </ion-text>
          </div>
  
          <ion-text color="danger" v-if="errorMessage">{{ errorMessage }}</ion-text>
        </div>
  
        <div class="button-wrapper">
          <ion-button expand="block" size="large" @click="getGeolocation">Obtenir la géolocalisation</ion-button>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonText, IonButtons } from '@ionic/vue';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    components: {
      IonPage,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonButton,
      IonText,
      IonButtons
    },
    setup() {
      const router = useRouter();
      const locations = ref<Array<{ latitude: number; longitude: number }>>([]); // Store multiple locations
      const errorMessage = ref<string>('');
  
      const logout = () => {
        router.push('/home');  
      };
  
      const clearLocations = () => {
        locations.value = []; 
        errorMessage.value = '';  
      };
  
      const getGeolocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              locations.value.push({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              });
              errorMessage.value = ''; 
            },
            (error) => {
              handleGeolocationError(error);
            }
          );
        } else {
          errorMessage.value = "La géolocalisation n'est pas prise en charge par votre navigateur.";
        }
      };
  
      const handleGeolocationError = (error: GeolocationPositionError) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage.value = "L'utilisateur a refusé la demande de géolocalisation.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage.value = "Les informations de localisation ne sont pas disponibles.";
            break;
          case error.TIMEOUT:
            errorMessage.value = "La demande de géolocalisation a expiré.";
            break;
          default:
            errorMessage.value = "Une erreur inconnue s'est produite.";
        }
      };
  
      return {
        locations,
        errorMessage,
        logout,
        clearLocations,
        getGeolocation
      };
    }
  });
  </script>
  
  <style scoped>
  .geo-wrapper {
    max-width: 500px;
    margin: 50px auto;
    text-align: center;
  }
  
  .location-item {
    margin-bottom: 1px; /* espace entre mes réponses */
  }
  
  .location-item ion-button {
    width: 100%; 
    text-align: left; 
    padding: 5px; 
    --border-radius: 3px; 
    --background: #d2ecd3; 
    --color: #333; 
  }
  
  .button-wrapper {
    max-width: 500px;
    margin: 25px auto;
  }
  
  ion-footer {
    bottom: 0;
    width: 100%;
  }
  
  ion-button {
    margin-top: 20px;
  }
  </style>
  
  