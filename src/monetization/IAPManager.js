/**
 * Gestor de compras in-app
 */

class IAPManager {
  constructor() {
    this.products = this.initializeProducts();
    this.purchasedProducts = [];
    this.store = null; // Google Play, App Store, etc.
  }
  
  /**
   * Inicializa productos disponibles
   */
  initializeProducts() {
    return {
      // Eliminación de anuncios
      remove_ads: {
        id: 'remove_ads',
        name: 'Sin Anuncios',
        description: 'Elimina todos los anuncios del juego',
        price: 2.99,
        currency: 'USD',
        type: 'permanent',
        icon: '🚫'
      },
      
      // Vidas extra
      lives_5: {
        id: 'lives_5',
        name: '5 Vidas Extra',
        description: 'Recibe 5 vidas adicionales',
        price: 0.99,
        currency: 'USD',
        type: 'consumable',
        icon: '❤️',
        quantity: 5
      },
      lives_10: {
        id: 'lives_10',
        name: '10 Vidas Extra',
        description: 'Recibe 10 vidas adicionales',
        price: 1.99,
        currency: 'USD',
        type: 'consumable',
        icon: '❤️',
        quantity: 10
      },
      lives_unlimited: {
        id: 'lives_unlimited',
        name: 'Vidas Infinitas',
        description: 'Nunca te quedes sin vidas',
        price: 4.99,
        currency: 'USD',
        type: 'permanent',
        icon: '♾️'
      },
      
      // Paquetes de monedas
      coins_500: {
        id: 'coins_500',
        name: '500 Monedas',
        description: 'Paquete de 500 monedas',
        price: 0.99,
        currency: 'USD',
        type: 'consumable',
        icon: '💰',
        quantity: 500
      },
      coins_1500: {
        id: 'coins_1500',
        name: '1500 Monedas',
        description: 'Paquete de 1500 monedas',
        price: 2.99,
        currency: 'USD',
        type: 'consumable',
        icon: '💰',
        quantity: 1500,
        bonus: 100
      },
      coins_5000: {
        id: 'coins_5000',
        name: '5000 Monedas',
        description: 'Paquete de 5000 monedas + 500 bonus',
        price: 9.99,
        currency: 'USD',
        type: 'consumable',
        icon: '💰',
        quantity: 5000,
        bonus: 500
      },
      
      // Skins de personaje
      skin_ninja: {
        id: 'skin_ninja',
        name: 'Skin Ninja',
        description: 'Transforma tu personaje en un ninja',
        price: 1.99,
        currency: 'USD',
        type: 'permanent',
        icon: '🥷',
        skinId: 'ninja'
      },
      skin_robot: {
        id: 'skin_robot',
        name: 'Skin Robot',
        description: 'Transforma tu personaje en un robot',
        price: 1.99,
        currency: 'USD',
        type: 'permanent',
        icon: '🤖',
        skinId: 'robot'
      },
      skin_alien: {
        id: 'skin_alien',
        name: 'Skin Alienígena',
        description: 'Transforma tu personaje en un alienígena',
        price: 1.99,
        currency: 'USD',
        type: 'permanent',
        icon: '👽',
        skinId: 'alien'
      },
      skin_pack_premium: {
        id: 'skin_pack_premium',
        name: 'Pack Premium de Skins',
        description: 'Todos los skins disponibles',
        price: 4.99,
        currency: 'USD',
        type: 'permanent',
        icon: '🎨',
        skins: ['ninja', 'robot', 'alien', 'pirate', 'wizard']
      },
      
      // Power-ups permanentes
      double_coins: {
        id: 'double_coins',
        name: 'Monedas Dobles',
        description: 'Recibe el doble de monedas permanentemente',
        price: 3.99,
        currency: 'USD',
        type: 'permanent',
        icon: '💎'
      },
      starting_powerup: {
        id: 'starting_powerup',
        name: 'Power-up Inicial',
        description: 'Comienza cada nivel con un power-up aleatorio',
        price: 2.99,
        currency: 'USD',
        type: 'permanent',
        icon: '⚡'
      },
      
      // Paquetes especiales
      starter_pack: {
        id: 'starter_pack',
        name: 'Paquete Inicial',
        description: '10 vidas + 1000 monedas + 1 skin',
        price: 4.99,
        currency: 'USD',
        type: 'consumable',
        icon: '🎁',
        contents: {
          lives: 10,
          coins: 1000,
          randomSkin: true
        }
      },
      ultimate_pack: {
        id: 'ultimate_pack',
        name: 'Paquete Ultimate',
        description: 'Todo lo que necesitas: sin ads, vidas infinitas, monedas dobles, todos los skins',
        price: 14.99,
        currency: 'USD',
        type: 'permanent',
        icon: '👑',
        includes: ['remove_ads', 'lives_unlimited', 'double_coins', 'skin_pack_premium']
      }
    };
  }
  
  /**
   * Inicializa la tienda
   */
  async initialize(storeProvider) {
    this.store = storeProvider;
    console.log('IAP Manager initialized');
    
    // Cargar productos de la tienda
    // await this.loadProducts();
    
    // Restaurar compras
    // await this.restorePurchases();
  }
  
  /**
   * Obtiene información de un producto
   */
  getProduct(productId) {
    return this.products[productId];
  }
  
  /**
   * Obtiene todos los productos
   */
  getAllProducts() {
    return Object.values(this.products);
  }
  
  /**
   * Obtiene productos por categoría
   */
  getProductsByCategory(category) {
    const categories = {
      lives: ['lives_5', 'lives_10', 'lives_unlimited'],
      coins: ['coins_500', 'coins_1500', 'coins_5000'],
      skins: ['skin_ninja', 'skin_robot', 'skin_alien', 'skin_pack_premium'],
      powerups: ['double_coins', 'starting_powerup'],
      special: ['remove_ads', 'starter_pack', 'ultimate_pack']
    };
    
    return categories[category].map(id => this.products[id]);
  }
  
  /**
   * Realiza una compra
   */
  async purchase(productId) {
    const product = this.products[productId];
    
    if (!product) {
      return { success: false, error: 'Product not found' };
    }
    
    try {
      console.log('Initiating purchase for:', product.name);
      
      // Simular compra
      // En producción: await this.store.purchase(productId);
      
      // Aplicar compra
      this.applyPurchase(productId);
      
      // Guardar compra
      if (product.type === 'permanent') {
        this.purchasedProducts.push(productId);
      }
      
      return {
        success: true,
        product: product,
        transactionId: 'txn_' + Date.now()
      };
    } catch (error) {
      console.error('Purchase error:', error);
      return { success: false, error: error };
    }
  }
  
  /**
   * Aplica los efectos de una compra
   */
  applyPurchase(productId) {
    const product = this.products[productId];
    
    switch(product.id) {
      case 'remove_ads':
        // Remover anuncios
        break;
      case 'lives_5':
      case 'lives_10':
        // Agregar vidas
        break;
      case 'lives_unlimited':
        // Activar vidas infinitas
        break;
      case 'coins_500':
      case 'coins_1500':
      case 'coins_5000':
        // Agregar monedas
        break;
      default:
        if (product.skinId) {
          // Desbloquear skin
        }
        break;
    }
  }
  
  /**
   * Restaura compras previas
   */
  async restorePurchases() {
    try {
      console.log('Restoring purchases...');
      
      // En producción: const purchases = await this.store.restore();
      // this.purchasedProducts = purchases;
      
      return { success: true };
    } catch (error) {
      console.error('Error restoring purchases:', error);
      return { success: false, error: error };
    }
  }
  
  /**
   * Verifica si un producto fue comprado
   */
  isPurchased(productId) {
    return this.purchasedProducts.includes(productId);
  }
  
  /**
   * Obtiene productos comprados
   */
  getPurchasedProducts() {
    return this.purchasedProducts.map(id => this.products[id]);
  }
}

export default IAPManager;
