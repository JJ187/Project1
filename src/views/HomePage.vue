<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>CONNEXION</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="login-wrapper">
        <ion-item lines="none">
          <ion-label position="stacked">Email</ion-label>
          <ion-input 
            v-model="email" 
            placeholder="Entrez votre email" 
            type="email" 
            required>
          </ion-input>
        </ion-item>
        
        <ion-item lines="none">
          <ion-label position="stacked">Mot de passe</ion-label>
          <ion-input 
            v-model="password" 
            placeholder="Entrez votre mot de passe" 
            type="password" 
            required>
          </ion-input>
        </ion-item>
        
        <ion-button expand="block" @click="handleLogin">Se connecter</ion-button>

        <!-- Sign Up Button -->
        <ion-button expand="block" class="create-account-button" router-link="/signup">Créer un compte</ion-button>

        <ion-text color="danger" v-if="errorMessage">{{ errorMessage }}</ion-text>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonText } from '@ionic/vue';

export default defineComponent({
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
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
    IonText
  },
  methods: {
    async handleLogin() {
      if (this.email && this.password) {
        try {
          // la requête vers l'API
          const response = await fetch('https://server-1-t93s.onrender.com/api/tp/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: this.email,
              password: this.password
            })
          });

          if (!response.ok) {
            throw new Error('Invalid login credentials');
          }

          const data = await response.json();
          
          // login: vers Geolocation
          this.$router.push('/geolocation');
        } catch (error) {

          if (error instanceof Error) {
            this.errorMessage = 'Login failed: ' + error.message;
          } else {
            this.errorMessage = 'An unknown error occurred';
          }
        }
      } else {
        this.errorMessage = 'Entrée(s) non-valide(s)';
      }
    }
  }
});
</script>

<style scoped>
.login-wrapper {
  max-width: 500px;
  margin: 0 auto;
  padding-top: 50px;
}

ion-item {
  --padding-start: 20px;
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
}.create-account-button {
  --background: #0d4f10; 
  --color: #fff; 
}

</style>

