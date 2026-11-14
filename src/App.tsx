import React, { useState } from 'react';
import { Navbar, PageView } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { Deals } from './components/Deals';
import { Menu } from './components/Menu';
import { About } from './components/About';
import { Gallery } from './components/Gallery';
import { Locations } from './components/Locations';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { CartItem, MenuItem, DealItem } from './types';
import { ArrowLeft, Home, Flame } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');

  const [cart, setCart] = useState<CartItem[]>([
    {
      menuItem: {
        id: 'zinger-classic',
        name: 'Kababjees Signature Zinger',
        category: 'zinger-burgers',
        price: 620,
        originalPrice: 690,
        description: 'Ultra-crunchy fried whole chicken fillet, crisp shred iceberg lettuce, melted cheese, and creamy garlic zinger sauce.',
        image: '/src/assets/images/zinger_chicken_burger_1793884338312.jpg',
        spicyLevel: 'Spicy',
        popular: true,
      },
      quantity: 1,
      selectedFlavor: 'Regular Zinger Sauce',
    },
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [currentOrderDetails, setCurrentOrderDetails] = useState<{
    orderType: 'delivery' | 'pickup';
    area: string;
    subtotal: number;
    deliveryFee: number;
    total: number;
    specialNotes: string;
  } | null>(null);

  const [orderSuccessData, setOrderSuccessData] = useState<{
    orderId: string;
    customerName: string;
    customerPhone: string;
    address: string;
    paymentMethod: string;
    total: number;
    items: CartItem[];
  } | null>(null);

  // Cart Handlers
  const handleAddToCart = (item: MenuItem, flavor?: string, drink?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (ci) =>
          ci.menuItem.id === item.id &&
          ci.selectedFlavor === flavor &&
          ci.selectedDrink === drink
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [
          ...prev,
          {
            menuItem: item,
            quantity: 1,
            selectedFlavor: flavor,
            selectedDrink: drink,
          },
        ];
      }
    });
  };

  const handleAddDealToCart = (deal: DealItem) => {
    const dealMenuItem: MenuItem = {
      id: deal.id,
      name: deal.title,
      category: 'family-deals',
      price: deal.price,
      originalPrice: deal.originalPrice,
      description: deal.itemsIncluded.join(', '),
      image: deal.image,
      popular: true,
    };

    handleAddToCart(dealMenuItem);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCart((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCart((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleProceedToCheckout = (details: {
    orderType: 'delivery' | 'pickup';
    area: string;
    subtotal: number;
    deliveryFee: number;
    total: number;
    specialNotes: string;
  }) => {
    setCurrentOrderDetails(details);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (orderData: {
    orderId: string;
    customerName: string;
    customerPhone: string;
    address: string;
    paymentMethod: string;
    total: number;
    items: CartItem[];
  }) => {
    setIsCheckoutOpen(false);
    setOrderSuccessData(orderData);
    setCart([]);
  };

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartAmount = cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#f1f2f6] flex flex-col font-sans selection:bg-[#E11D2A] selection:text-white">
      {/* Navigation Top Bar with Home Page support */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOrder={() => {
          if (cart.length > 0) {
            setIsCartOpen(true);
          } else {
            handleNavigate('menu');
          }
        }}
      />

      {/* Breadcrumb strip when browsing sub-pages */}
      {currentPage !== 'home' && (
        <div className="bg-[#10121a] border-b border-[#1f2230] py-3 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
            <button
              onClick={() => handleNavigate('home')}
              className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
            <div className="flex items-center gap-2 text-neutral-500 font-medium">
              <span className="text-neutral-400">Home</span>
              <span>/</span>
              <span className="text-[#F59E0B] capitalize font-bold">
                {currentPage === 'locations' ? 'Branches & Karachi Map' : currentPage}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main View Router */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
            onAddDealToCart={handleAddDealToCart}
            onOpenOrder={() => {
              if (cart.length > 0) {
                setIsCartOpen(true);
              } else {
                handleNavigate('menu');
              }
            }}
          />
        )}

        {currentPage === 'menu' && (
          <Menu onAddToCart={handleAddToCart} />
        )}

        {currentPage === 'deals' && (
          <Deals onAddDealToCart={handleAddDealToCart} />
        )}

        {currentPage === 'about' && (
          <About />
        )}

        {currentPage === 'gallery' && (
          <Gallery />
        )}

        {currentPage === 'locations' && (
          <Locations
            onOrderNow={() => {
              if (cart.length > 0) {
                setIsCartOpen(true);
              } else {
                handleNavigate('menu');
              }
            }}
          />
        )}
      </main>

      {/* Footer with Page Navigation */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Bottom Cart Bar for Mobile Viewports */}
      {cart.length > 0 && (
        <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-[#E11D2A] to-[#b9151f] text-white shadow-2xl shadow-red-950/80 flex items-center justify-between border border-red-500/30 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-black/30 flex items-center justify-center font-bold text-xs">
                {totalCartCount}
              </div>
              <span className="font-heading font-bold text-sm">View Your Food Order</span>
            </div>
            <div className="font-condensed font-black text-base tabular-nums">
              Rs. {totalCartAmount.toLocaleString()}
            </div>
          </button>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Checkout Modal */}
      {isCheckoutOpen && currentOrderDetails && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          items={cart}
          orderDetails={currentOrderDetails}
          onOrderSuccess={handleOrderSuccess}
        />
      )}

      {/* Order Success & Live Tracker Modal */}
      {orderSuccessData && (
        <OrderSuccessModal
          isOpen={!!orderSuccessData}
          onClose={() => setOrderSuccessData(null)}
          orderData={orderSuccessData}
        />
      )}
    </div>
  );
}
