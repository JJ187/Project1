<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <!-- Arrow Button to Navigate Back to Login -->
            <ion-button fill="clear" router-link="/home">
              <ion-icon :icon="chevronBackIcon" slot="icon-only"></ion-icon>
            </ion-button>
          </ion-buttons>
          <ion-title>CRÉER UN COMPTE</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding">
        <div class="signup-wrapper">
          <!-- Label on top of First Name input -->
          <ion-item lines="none">
            <ion-label position="stacked">Prénom</ion-label>
            <ion-input 
              v-model="firstName" 
              placeholder="Entrez votre prénom" 
              required>
            </ion-input>
          </ion-item>
  
          <!-- Label on top of Last Name input -->
          <ion-item lines="none">
            <ion-label position="stacked">Nom</ion-label>
            <ion-input 
              v-model="lastName" 
              placeholder="Entrez votre nom" 
              required>
            </ion-input>
          </ion-item>
  
          <!-- Label on top of Email input -->
          <ion-item lines="none">
            <ion-label position="stacked">Email</ion-label>
            <ion-input 
              v-model="email" 
              placeholder="Entrez votre email" 
              type="email" 
              required>
            </ion-input>
          </ion-item>
          
          <!-- Label on top of Password input -->
          <ion-item lines="none">
            <ion-label position="stacked">Mot de passe</ion-label>
            <ion-input 
              v-model="password" 
              placeholder="Entrez votre mot de passe" 
              type="password" 
              required>
            </ion-input>
          </ion-item>
  
          <!-- Sign Up Button (Green) -->
          <ion-button expand="block" class="signup-button" @click="handleSignUp">Enregistrer</ion-button>
  
          <!-- Error Message Display -->
          <ion-text color="danger" v-if="errorMessage">{{ errorMessage }}</ion-text>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonText, IonIcon, IonButtons } from '@ionic/vue';
  import { chevronBackOutline } from 'ionicons/icons';  // Import the specific icon
  
  export default defineComponent({
    data() {
      return {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        errorMessage: '',
        chevronBackIcon: chevronBackOutline  // Register the icon
      };
    },
    components: {
      IonPage,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonItem,
      IonLabel,
      IonInput,
      IonButton,
      IonText,
      IonIcon,
      IonButtons
    },
    methods: {
      async handleSignUp() {
        if (this.firstName && this.lastName && this.email && this.password) {
          try {
            const response = await fetch('https://server-1-t93s.onrender.com/api/tp/signup', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password
              })
            });
  
            if (!response.ok) {
              throw new Error('Sign-up failed');
            }
  
            this.$router.push('/home');
          } catch (error) {
            if (error instanceof Error) {
              this.errorMessage = 'Sign-up failed: ' + error.message;
            } else {
              this.errorMessage = 'An unknown error occurred';
            }
          }
        } else {
          this.errorMessage = 'Veuillez remplir tous les champs';
        }
      }
    }
  });
  </script>
  
  <style scoped>
  .signup-wrapper {
    max-width: 500px;
    margin: 0 auto;
    padding-top: 50px;
  }
  
  ion-item {
    --padding-start: 0px;
    margin-bottom: 20px;
  }
  
  ion-label {
    font-size: 1.1rem; 
    display: block; 
    margin-bottom: 8px;
    color: var(--ion-color-primary); 
  }
  
  ion-input {
    font-size: 1.2rem;
  }

  .signup-button {
  --background: #0d4f10; 
  --color: #fff;
}
  </style>
  