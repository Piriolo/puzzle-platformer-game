/**
 * Gestor de publicidad del juego
 */

class AdManager {
  constructor() {
    this.adProvider = null; // AdMob, Unity Ads, etc.
    this.adsRemoved = false;
    this.levelsSinceLastAd = 0;
    this.adFrequency = 3; // Mostrar ad cada 3 niveles
    this.lastAdTime = Date.now();
    this.minTimeBetweenAds = 120000; // 2 minutos
  }
  
  /**
   * Inicializa el proveedor de anuncios
   */
  initialize(provider) {
    this.adProvider = provider;
    // Inicializar SDK del proveedor
    console.log('AdManager initialized with provider:', provider);
  }
  
  /**
   * Verifica si se debe mostrar un anuncio
   */
  shouldShowAd() {
    if (this.adsRemoved) {
      return false;
    }
    
    const timeSinceLastAd = Date.now() - this.lastAdTime;
    if (timeSinceLastAd < this.minTimeBetweenAds) {
      return false;
    }
    
    return this.levelsSinceLastAd >= this.adFrequency;
  }
  
  /**
   * Muestra anuncio intersticial
   */
  async showInterstitialAd() {
    if (!this.shouldShowAd()) {
      return { shown: false, reason: 'not_ready' };
    }
    
    try {
      console.log('Showing interstitial ad...');
      
      // Simular mostrar anuncio
      // En producción: await this.adProvider.showInterstitial();
      
      this.lastAdTime = Date.now();
      this.levelsSinceLastAd = 0;
      
      return { shown: true };
    } catch (error) {
      console.error('Error showing interstitial ad:', error);
      return { shown: false, error: error };
    }
  }
  
  /**
   * Muestra anuncio recompensado
   */
  async showRewardedAd(rewardType) {
    try {
      console.log('Showing rewarded ad for:', rewardType);
      
      // Simular mostrar anuncio recompensado
      // En producción: await this.adProvider.showRewarded();
      
      const rewards = {
        extra_life: { lives: 1 },
        bonus_coins: { coins: 100 },
        continue_level: { continue: true },
        double_coins: { duration: 300 } // 5 minutos
      };
      
      return {
        shown: true,
        completed: true,
        reward: rewards[rewardType]
      };
    } catch (error) {
      console.error('Error showing rewarded ad:', error);
      return { shown: false, completed: false, error: error };
    }
  }
  
  /**
   * Muestra banner publicitario
   */
  showBanner(position = 'bottom') {
    if (this.adsRemoved) {
      return;
    }
    
    console.log('Showing banner ad at position:', position);
    // En producción: this.adProvider.showBanner(position);
  }
  
  /**
   * Oculta banner publicitario
   */
  hideBanner() {
    console.log('Hiding banner ad');
    // En producción: this.adProvider.hideBanner();
  }
  
  /**
   * Incrementa contador de niveles
   */
  onLevelComplete() {
    this.levelsSinceLastAd++;
  }
  
  /**
   * Remueve anuncios (compra IAP)
   */
  removeAds() {
    this.adsRemoved = true;
    this.hideBanner();
    console.log('Ads removed permanently');
  }
  
  /**
   * Verifica si los anuncios están disponibles
   */
  isAdAvailable(adType) {
    if (this.adsRemoved && adType !== 'rewarded') {
      return false;
    }
    
    // Verificar con el proveedor
    // return this.adProvider.isAdReady(adType);
    return true;
  }
  
  /**
   * Obtiene estadísticas de anuncios
   */
  getAdStats() {
    return {
      adsRemoved: this.adsRemoved,
      levelsSinceLastAd: this.levelsSinceLastAd,
      lastAdTime: this.lastAdTime,
      nextAdIn: Math.max(0, this.adFrequency - this.levelsSinceLastAd)
    };
  }
}

export default AdManager;
